import connectDB from "../../../../config/dbconnection";
import AuthService from "../../../../services/authServices";
import { getAuthenticatedUser } from "../../../../utils/auth";
import { success, serverError } from "../../../../utils/apiResponse";

export async function GET(req) {
  try {
    await connectDB();
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return success("User is not authenticated.", { user: null });
    }

    const me = await AuthService.getCurrentUser(user.id);
    return success("Authenticated user loaded successfully.", { user: me });
  } catch (error) {
    console.error("GET_AUTH_USER_ERROR:", error);
    return serverError("Unable to get the authenticated user.");
  }
}
