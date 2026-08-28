import connectDB from "@/config/database";
import AuthService from "@/services/authServices";
import {
  success,
  serverError,
  validationError,
} from "@/utils/apiResponse";
import { z } from "zod";

const refreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const validation =
      refreshSchema.safeParse(body);

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

    return success(
      "Access token refreshed successfully.",
      result
    );
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