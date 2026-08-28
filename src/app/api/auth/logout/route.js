import { z } from "zod";
import connectDB from "../../../../config/dbconnection";
import AuthService from "../../../../services/authServices";
import { requireRole } from "../../../../utils/auth";
import apiResponse from "../../../../utils/common/apiResponse";

export async function POST(req) {
  try {
    const auth = await requireRole(req, ["admin", "sales", "user"]);
    if (auth.error) return auth.error;
    await connectDB();
    const validation = z.object({ refreshToken: z.string().min(1) }).safeParse(await req.json());
    if (!validation.success) return apiResponse.validationError("Validation failed.", ["Refresh token is required."], 422);
    const response = apiResponse.success("Logged out successfully.", await AuthService.logout({ userId: auth.user.id, refreshToken: validation.data.refreshToken }));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  } catch (error) { return apiResponse.error(error); }
}
