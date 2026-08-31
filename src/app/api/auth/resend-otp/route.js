import { z } from "zod";
import connectDB from "../../../../config/dbconnection";
import AuthService from "../../../../services/authServices";
import apiResponse from "../../../../utils/common/apiResponse";

export async function POST(req) {
  try {
    await connectDB();
    const validation = z.object({ email: z.string().trim().email().transform((value) => value.toLowerCase()) }).safeParse(await req.json());
    if (!validation.success) return apiResponse.validationError("Validation failed.", validation.error.issues.map((issue) => issue.message), 422);
    return apiResponse.success("Verification OTP resent successfully.", await AuthService.resendSignupOtp(validation.data.email));
  } catch (error) { return apiResponse.error(error); }
}
