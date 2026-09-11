import connectDB from "../../../../config/dbconnection";
import AuthService from "../../../../services/authServices";
import {
  success,
  serverError,
  validationError,
} from "../../../../utils/apiResponse";
import { z } from "zod";
import { durationToSeconds } from "../../../../utils/auth";

const refreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export async function POST(req) {
  try {
    await connectDB();

    let body = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const refreshToken = body.refreshToken || req.cookies.get("refreshToken")?.value;

    const validation =
      refreshSchema.safeParse({ refreshToken });

    if (!validation.success) {
      const errors = validation.error.issues.map(
        (error) => error.message
      );

      return validationError(errors, 422);
    }

    const service = AuthService;

    const result =
      await service.refreshAccessToken(
        validation.data
      );

    const response = success(
      "Access token refreshed successfully.",
      result
    );
    const secure = process.env.NODE_ENV === "production";
    response.cookies.set("accessToken", result.accessToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: durationToSeconds(process.env.JWT_ACCESS_EXPIRES_IN, 15 * 60),
    });
    return response;
  } catch (error) {
    console.error(
      "REFRESH_TOKEN_ERROR:",
      error
    );

    if (error.statusCode) {
      return validationError(
        error.message,
        error.statusCode
      );
    }

    return serverError(
      "Unable to refresh access token."
    );
  }
}