import connectDB from "../../../../config/dbconnection";
import AuthService from "../../../../services/authServices";
import {
  success,
  serverError,
  validationError,
} from "../../../../utils/apiResponse";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    token: z
      .string()
      .min(1, "Reset token is required"),

    password: z
      .string()
      .min(
        8,
        "Password must contain at least 8 characters"
      )
      .max(128, "Password is too long"),

    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const validation =
      resetPasswordSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map(
        (error) => error.message
      );

      return validationError(errors, 422);
    }

    const service = AuthService;

    const result =
      await service.resetPassword(
        validation.data
      );

    return success(
      result.message,
      result.data
    );
  } catch (error) {
    console.error(
      "RESET_PASSWORD_ERROR:",
      error
    );

    if (error.statusCode) {
      return validationError(
        error.message,
        error.statusCode
      );
    }

    return serverError(
      "Unable to reset password."
    );
  }
}