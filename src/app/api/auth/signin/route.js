import { z } from "zod";
import connectDB from "../../../../config/dbconnection";
import AuthService from "../../../../services/authServices";
import { success, serverError, validationError } from "../../../../utils/apiResponse";

const signinSchema = z.object({ email: z.string().trim().email("Invalid email address").transform((value) => value.toLowerCase()), password: z.string().min(1, "Password is required") });

export async function POST(req) {
  try {
    await connectDB();
    const validation = signinSchema.safeParse(await req.json());
    if (!validation.success) return validationError(validation.error.issues.map((error) => error.message), 422);
    const result = await AuthService.signin(validation.data);
    const response = success("Sign in completed successfully.", result);
    const secure = process.env.NODE_ENV === "production";
    response.cookies.set("accessToken", result.accessToken, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 15 * 60 });
    response.cookies.set("refreshToken", result.refreshToken, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 7 * 24 * 60 * 60 });
    return response;
  } catch (error) {
    console.error("SIGNIN_ERROR:", error);
    if (error.statusCode) return validationError(error.message, null, error.statusCode);
    return serverError("Unable to process sign in.");
  }
}
