import connectDB from "../../../../config/dbconnection";
import {
  success,
  serverError,
} from "../../../../utils/apiResponse";
import PermissionService from "../../../../services/permissionServices";
import { requireAdmin } from "../../../../utils/auth";
export async function GET(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();

    const { searchParams } =
      new URL(req.url);

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        Number(searchParams.get("limit")) || 20,
        1
      ),
      100
    );

    const moduleName =
      searchParams.get("module") || undefined;

    const search =
      searchParams.get("search") || undefined;

    const service = PermissionService;

    const result =
      await service.getAllPermissions({
        page,
        limit,
        module: moduleName,
        search,
      });

    return success(
      "Permissions fetched successfully.",
      result
    );
  } catch (error) {
    console.error(
      "GET_PERMISSIONS_ERROR:",
      error
    );

    return serverError(
      "Unable to fetch permissions."
    );
  }
}