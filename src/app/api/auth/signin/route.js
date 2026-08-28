// import connectDB from "@/config/database";
import AuthService from "@/services/authServices";
import {
  success,
  serverError,
  validationError,
} from "@/utils/apiResponse";
import { z } from "zod";
import connectDB from "@/config/dbconnection";

const signinSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .transform((value) => value.toLowerCase()),

  password: z
    .string()
    .min(1, "Password is required"),
});

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const validation =
      signinSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map(
        (error) => error.message
      );

      return validationError(errors, 422);
    }

    const service = AuthService;

    const result =
      await service.requestSigninOtp(
        validation.data
      );

    return success(
      "OTP sent successfully. Please verify the OTP.",
      result
    );
  } catch (error) {
    console.error("SIGNIN_ERROR:", error);

    if (error.statusCode) {
      return validationError(
        error.message,
        error.statusCode
      );
    }

    return serverError(
      "Unable to process sign in."
    );
  }
}