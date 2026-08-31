import connectDB from "../../../../config/dbconnection";
import AuthService from "../../../../services/authServices";
import {
  success,
  serverError,
  validationError,
} from "../../../../utils/apiResponse";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Invalid email address").transform((value) => value.toLowerCase()),
});

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const validation =
      forgotPasswordSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map(
        (error) => error.message
      );

      return validationError(errors, 422);
    }

    const service = AuthService;

    const requestOrigin = new URL(req.url).origin;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || requestOrigin;
    const result = await service.generatePasswordResetToken(validation.data.email, baseUrl);

    return success(
      result.message,
      result
    );
  } catch (error) {
    console.error(
      "FORGOT_PASSWORD_ERROR:",
      error
    );

    if (error.statusCode) {
      return validationError(
        error.message,
        error.statusCode
      );
    }

    return serverError(
      "Unable to request a password reset."
    );
  }
}