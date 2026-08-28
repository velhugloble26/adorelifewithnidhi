import { z } from "zod";
import connectDB from "../../../../config/dbconnection";
import RoleService from "../../../../services/roleServices";
import { requireAdmin } from "../../../../utils/auth";
import apiResponse from "../../../../utils/common/apiResponse";
export async function DELETE(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();
    const validation = z.object({ roleId: z.string().min(1) }).safeParse(await req.json());
    if (!validation.success) return apiResponse.validationError("Validation failed.", ["Role ID is required."], 422);
    return apiResponse.success("Role deleted successfully.", await RoleService.deleteRole(validation.data.roleId));
  } catch (error) {
    return apiResponse.error(error);
  }
}
