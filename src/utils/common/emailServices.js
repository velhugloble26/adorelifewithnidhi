import nodemailer from "nodemailer";

const requiredEnv = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_VERIFY_EMAIL",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.warn(`Missing environment variable: ${key}`);
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

class EmailService {
  async sendEmail({ to, subject, html, text }) {
    if (!to) {
      throw new Error("Recipient email is required");
    }

    const info = await transporter.sendMail({
      from: `"Adore Life with Nidhi" <${process.env.SMTP_VERIFY_EMAIL}>`,
      to,
      subject,
      text,
      html,
    });

    return {
      messageId: info.messageId,
    };
  }

  async sendSignupOtp({ email, otp, expiresInMinutes = 5 }) {
    const subject = "Verify your Adore Life with Nidhi account";

    const text = `
Your signup verification OTP is: ${otp}

This OTP will expire in ${expiresInMinutes} minutes.

If you did not create this account, please ignore this email.
    `.trim();

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
        <h2>Verify your Adore Life with Nidhi account</h2>

        <p>Use the following OTP to complete your signup:</p>

        <div style="
          font-size:32px;
          font-weight:bold;
          letter-spacing:8px;
          padding:20px;
          background:#f5f5f5;
          text-align:center;
          border-radius:8px;
        ">
          ${otp}
        </div>

        <p>
          This OTP will expire in
          <strong>${expiresInMinutes} minutes</strong>.
        </p>

        <p>
          If you did not request this OTP, you can safely ignore this email.
        </p>
      </div>
    `;

    return this.sendEmail({
      to: email,
      subject,
      text,
      html,
    });
  }

  async sendWelcomeEmail({ email, name }) {
    const subject = "Welcome to Adore Life with Nidhi";
    const text = `Hello ${name || "there"},\n\nWelcome to Adore Life with Nidhi. Your account login was successful.\n\nIf this was not you, please reset your password.`;
    const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#173f4d"><h2>Welcome to Adore Life with Nidhi</h2><p>Hello ${name || "there"},</p><p>Your account login was successful.</p><p>If this was not you, please reset your password immediately.</p></div>`;
    return this.sendEmail({ to: email, subject, text, html });
  }

  async sendPasswordResetEmail({ email, resetUrl, expiresInMinutes = 15 }) {
    const subject = "Reset your Adore Life with Nidhi password";
    const text = `Reset your password using this link: ${resetUrl}\n\nThis link expires in ${expiresInMinutes} minutes. If you did not request this, ignore this email.`;
    const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#173f4d"><h2>Reset your password</h2><p>We received a request to reset your Adore Life with Nidhi password.</p><p><a href="${resetUrl}" style="display:inline-block;padding:12px 20px;background:#003044;color:#fff;text-decoration:none;border-radius:8px">Choose a new password</a></p><p>This link expires in <strong>${expiresInMinutes} minutes</strong>.</p><p>If you did not request this, you can safely ignore this email.</p></div>`;
    return this.sendEmail({ to: email, subject, text, html });
  }

  async verifyConnection() {
    return transporter.verify();
  }
}

export default new EmailService();