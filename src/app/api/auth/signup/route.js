
import { z } from "zod";
import connectDB from "../../../../config/dbconnection";
import authServices from "../../../../services/authServices";
import apiResponse from "../../../../utils/common/apiResponse";

const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100, "Name is too long"),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .transform((value) => value.toLowerCase()),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(128, "Password is too long"),
});

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const validation =
      signupSchema.safeParse(body);

    if (!validation.success) {
      const errors =
        validation.error.issues.map(
          (error) => error.message
        );

      return apiResponse.validationError(
        "Validation failed.",
        errors
      );
    }

    // const service = new authServices();

    const result =
      await authServices.register(
        validation.data
      );

    return apiResponse.created(
      "Verification OTP sent successfully.",
      result
    );
  } catch (error) {
    console.error("SIGNUP_ERROR:", error);

    return apiResponse.error(error);
  }
}