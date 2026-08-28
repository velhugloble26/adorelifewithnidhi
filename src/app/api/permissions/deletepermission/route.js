import { z } from "zod";
import connectDB from "../../../../config/dbconnection";
import PermissionService from "../../../../services/permissionServices";
import { requireAdmin } from "../../../../utils/auth";
import apiResponse from "../../../../utils/common/apiResponse";

export async function DELETE(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();
    const validation = z
      .object({ permissionId: z.string().min(1) })
      .safeParse(await req.json());
    if (!validation.success)
      return apiResponse.validationError(
        "Validation failed.",
        ["Permission ID is required."],
        422,
      );
    return apiResponse.success(
      "Permission deleted successfully.",
      await PermissionService.deletePermission(validation.data.permissionId),
    );
  } catch (error) {
    return apiResponse.error(error);
  }
}
