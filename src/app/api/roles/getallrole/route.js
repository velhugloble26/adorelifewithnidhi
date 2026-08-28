import { requireAdmin } from "@/utils/auth";
import connectDB from "@/config/database";
import RoleService from "@/services/roleServices";
import {
  success,
  serverError,
} from "@/utils/apiResponse";

export async function GET(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();

    const service = RoleService;

    const result =
      await service.getAllRoles();

    return success(
      "Roles fetched successfully.",
      result
    );
  } catch (error) {
    console.error(
      "GET_ROLES_ERROR:",
      error
    );

    return serverError(
      "Unable to fetch roles."
    );
  }
}