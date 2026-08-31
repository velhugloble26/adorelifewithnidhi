import connectDB from "../../../../config/dbconnection";
import AuthService from "../../../../services/authServices";
import {
  success,
  serverError,
  validationError,
} from "../../../../utils/apiResponse";
import { z } from "zod";

const verifyOtpSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .transform((value) => value.toLowerCase()),

  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const validation =
      verifyOtpSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map(
        (error) => error.message
      );

      return validationError(errors, 422);
    }

    const service = AuthService;

    const result =
      await service.verifySignupOtp(
        validation.data
      );

    const response = success("Email verified and signup completed successfully.", result);
    const secure = process.env.NODE_ENV === "production";
    response.cookies.set("accessToken", result.accessToken, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 15 * 60 });
    response.cookies.set("refreshToken", result.refreshToken, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 7 * 24 * 60 * 60 });
    return response;
  } catch (error) {
    console.error(
      "VERIFY_SIGNUP_OTP_ERROR:",
      error
    );

    if (error.statusCode) {
      return validationError(
        error.message,
        error.statusCode
      );
    }

    return serverError(
      "Unable to verify OTP."
    );
  }
}