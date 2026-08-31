import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} from "../utils/common/errorhandlers";
import emailServices from "../utils/common/emailServices";
import { LoginOtp, UserRoles, Users } from "../schema/schema";

class AuthService {
  generateOtp() {
    return crypto.randomInt(100000, 1000000).toString();
  }

  hashOtp(otp) {
    return crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
  }

  generateAccessToken(user) {
    return jwt.sign(
      {
        sub: user._id.toString(),
        email: user.email,
        role: user.role_id?.user_type || user.role_id?.toString(),
        role_id: user.role_id?._id?.toString() || user.role_id?.toString(),
        type: "access",
      },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
      }
    );
  }

  generateRefreshToken(user) {
    return jwt.sign(
      {
        sub: user._id.toString(),
        type: "refresh",
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
      }
    );
  }

async register({ name, email, password }) {
  if (!name || !email || !password) throw BadRequestError("Name, email and password are required.");
  const normalizedEmail = email.toLowerCase().trim();
  if (password.length < 8) throw BadRequestError("Password must contain at least 8 characters.");

  let user = await Users.findOne({ email: normalizedEmail });
  if (user?.emailVerified !== false) {
    throw ConflictError("An account with this email already exists.", "EMAIL_ALREADY_EXISTS");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  if (user) {
    user.name = name.trim();
    user.password = passwordHash;
    user.status = "inactive";
    await user.save();
  } else {
    const role = await UserRoles.findOne({ user_type: "user" });
    if (!role) throw NotFoundError("Default signup role is not configured.", "DEFAULT_ROLE_NOT_FOUND");
    user = await Users.create({ name: name.trim(), email: normalizedEmail, password: passwordHash, role_id: role._id, status: "inactive", emailVerified: false, emailVerifiedAt: null, refreshTokens: [] });
  }

  await this.issueSignupOtp(normalizedEmail);
  return { email: normalizedEmail, expiresIn: 300, message: "Verification OTP sent successfully." };
}

  async signin({ email, password }) {
    if (!email || !password) throw BadRequestError("Email and password are required.");
    const normalizedEmail = email.toLowerCase().trim();
    const user = await Users.findOne({ email: normalizedEmail }).populate({ path: "role_id", populate: { path: "permissions" } });
    if (!user || !(await bcrypt.compare(password, user.password))) throw UnauthorizedError("Invalid email or password.", "INVALID_CREDENTIALS");
    if (user.emailVerified === false) throw UnauthorizedError("Please verify your email before signing in.", "EMAIL_NOT_VERIFIED");
    if (user.status !== "active") throw UnauthorizedError("This account is not active. Please contact support.", "ACCOUNT_INACTIVE");

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    user.refreshTokens = [...(user.refreshTokens || []).slice(-4), refreshToken];
    await user.save();
    emailServices.sendWelcomeEmail({ email: user.email, name: user.name }).catch((error) => console.error("WELCOME_EMAIL_ERROR:", error));
    return { user: { id: user._id, name: user.name, email: user.email, role: user.role_id?.user_type, permissions: user.role_id?.permissions?.map((permission) => permission.key) || [] }, accessToken, refreshToken };
  }

  async issueSignupOtp(email) {
    await LoginOtp.updateMany({ email, purpose: "signup", verified: false }, { $set: { verified: true } });
    const otp = this.generateOtp();
    await LoginOtp.create({ email, otp_hash: this.hashOtp(otp), expires_at: new Date(Date.now() + 5 * 60 * 1000), attempts: 0, verified: false, purpose: "signup" });
    await emailServices.sendSignupOtp({ email, otp, expiresInMinutes: 5 });
  }

  async verifySignupOtp({ email, otp }) {
    if (!email || !otp) throw BadRequestError("Email and OTP are required.");
    const normalizedEmail = email.toLowerCase().trim();
    if (!/^\d{6}$/.test(otp)) throw BadRequestError("OTP must be a 6-digit number.", "INVALID_OTP_FORMAT");
    const user = await Users.findOne({ email: normalizedEmail }).populate({ path: "role_id", populate: { path: "permissions" } });
    if (!user) throw NotFoundError("Account not found.", "ACCOUNT_NOT_FOUND");
    if (user.emailVerified !== false) throw BadRequestError("This email is already verified. Please sign in.", "EMAIL_ALREADY_VERIFIED");

    const otpRecord = await LoginOtp.findOne({ email: normalizedEmail, purpose: "signup", verified: false }).sort({ created_at: -1 });
    if (!otpRecord) throw UnauthorizedError("OTP not found or already used. Please request a new OTP.", "OTP_NOT_FOUND");
    if (otpRecord.expires_at < new Date()) { otpRecord.verified = true; await otpRecord.save(); throw UnauthorizedError("OTP has expired. Please request a new OTP.", "OTP_EXPIRED"); }
    if (otpRecord.attempts >= 5) throw UnauthorizedError("Too many invalid OTP attempts. Please request a new OTP.", "OTP_ATTEMPTS_EXCEEDED");
    if (this.hashOtp(otp) !== otpRecord.otp_hash) { otpRecord.attempts += 1; await otpRecord.save(); throw UnauthorizedError("Invalid OTP.", "INVALID_OTP"); }

    otpRecord.verified = true;
    user.emailVerified = true;
    user.emailVerifiedAt = new Date();
    user.status = "active";
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    user.refreshTokens = [...(user.refreshTokens || []).slice(-4), refreshToken];
    await Promise.all([otpRecord.save(), user.save()]);
    emailServices.sendWelcomeEmail({ email: user.email, name: user.name }).catch((error) => console.error("WELCOME_EMAIL_ERROR:", error));
    return { user: { id: user._id, name: user.name, email: user.email, role: user.role_id?.user_type, permissions: user.role_id?.permissions?.map((permission) => permission.key) || [] }, accessToken, refreshToken };
  }

  async refreshAccessToken({
    refreshToken,
  }) {
    if (!refreshToken) {
      throw UnauthorizedError(
        "Refresh token is required."
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );
    } catch {
      throw UnauthorizedError(
        "Invalid or expired refresh token.",
        "INVALID_REFRESH_TOKEN"
      );
    }

    if (decoded.type !== "refresh") {
      throw UnauthorizedError(
        "Invalid refresh token.",
        "INVALID_REFRESH_TOKEN"
      );
    }

    const user = await Users.findById(decoded.sub);

    if (!user) {
      throw UnauthorizedError(
        "User account no longer exists."
      );
    }

    if (user.emailVerified === false || user.status !== "active") {
      throw UnauthorizedError("This account is not available for sign in.", "ACCOUNT_INACTIVE");
    }

    if (!user.refreshTokens?.includes(refreshToken)) {
      throw UnauthorizedError(
        "Refresh token has been revoked.",
        "REFRESH_TOKEN_REVOKED"
      );
    }

    const newAccessToken =
      this.generateAccessToken(user);

    return {
      accessToken: newAccessToken,
    };
  }

  async logout({
    userId,
    refreshToken,
  }) {
    if (!userId || !refreshToken) {
      throw BadRequestError(
        "User ID and refresh token are required."
      );
    }

    await Users.findByIdAndUpdate(
      userId,
      {
        $pull: {
          refreshTokens: refreshToken,
        },
      }
    );

    return {
      message: "Logged out successfully.",
    };
  }

  async logoutAll(userId) {
    if (!userId) {
      throw BadRequestError(
        "User ID is required."
      );
    }

    await Users.findByIdAndUpdate(
      userId,
      {
        $set: {
          refreshTokens: [],
        },
      }
    );

    return {
      message: "Logged out from all devices.",
    };
  }

  async getCurrentUser(userId) {
    const user = await Users.findById(userId)
      .select("-password -refreshTokens")
      .populate({
        path: "role_id",
        populate: {
          path: "permissions",
        },
      });

    if (!user) {
      throw NotFoundError(
        "User not found."
      );
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role_id?.user_type,

      permissions:
        user.role_id?.permissions?.map(
          (permission) => permission.key
        ) || [],
    };
  }

  async generatePasswordResetToken(email, baseUrl) {
    const normalizedEmail = email.toLowerCase().trim();

    const user = await Users.findOne({
      email: normalizedEmail,
    });

    // Don't reveal whether the account exists.
    if (!user) {
      return {
        message:
          "If an account exists with this email, a reset link will be sent.",
      };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = resetTokenHash;

    user.resetPasswordExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await user.save();

    const resetUrl = `${baseUrl.replace(/\/$/, "")}/reset-password?token=${encodeURIComponent(resetToken)}`;
    await emailServices.sendPasswordResetEmail({ email: normalizedEmail, resetUrl, expiresInMinutes: 15 });

    return {
      message: "If an account exists with this email, a reset link will be sent.",
    };
  }

  async resetPassword({ token, password }) {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const user = await Users.findOne({ resetPasswordToken: tokenHash, resetPasswordExpires: { $gt: new Date() } });
    if (!user) throw UnauthorizedError("Invalid or expired password reset token.", "INVALID_RESET_TOKEN");
    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.refreshTokens = [];
    await user.save();
    return { message: "Password reset successfully.", data: null };
  }

  async resendSignupOtp(email) {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await Users.findOne({ email: normalizedEmail });
    if (!user) throw NotFoundError("Account not found.", "ACCOUNT_NOT_FOUND");
    if (user.emailVerified !== false) throw BadRequestError("This email is already verified. Please sign in.", "EMAIL_ALREADY_VERIFIED");
    const latest = await LoginOtp.findOne({ email: normalizedEmail, purpose: "signup" }).sort({ created_at: -1 });
    if (latest && Date.now() - latest.created_at.getTime() < 60_000) throw BadRequestError("Please wait 60 seconds before requesting another OTP.", "OTP_RATE_LIMITED");
    const hourlyCount = await LoginOtp.countDocuments({ email: normalizedEmail, purpose: "signup", created_at: { $gt: new Date(Date.now() - 60 * 60 * 1000) } });
    if (hourlyCount >= 5) throw BadRequestError("Too many OTP requests. Please try again later.", "OTP_RATE_LIMITED");
    await this.issueSignupOtp(normalizedEmail);
    return { email: normalizedEmail, expiresIn: 300, message: "Verification OTP resent successfully." };
  }

}
export default new AuthService();