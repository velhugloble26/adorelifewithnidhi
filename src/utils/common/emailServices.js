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
      from: `"MaayaLab AI" <${process.env.SMTP_VERIFY_EMAIL}>`,
      to,
      subject,
      text,
      html,
    });

    return {
      messageId: info.messageId,
    };
  }

  async sendLoginOtp({ email, otp, expiresInMinutes = 5 }) {
    const subject = "Your MaayaLab AI Sign-in OTP";

    const text = `
Your sign-in OTP is: ${otp}

This OTP will expire in ${expiresInMinutes} minutes.

If you did not try to sign in, please ignore this email.
    `.trim();

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
        <h2>Sign in to MaayaLab AI</h2>

        <p>Use the following OTP to complete your sign-in:</p>

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

  async verifyConnection() {
    return transporter.verify();
  }
}

export default new EmailService();