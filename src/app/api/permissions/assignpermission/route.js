import { requireAdmin } from "@/utils/auth";
import connectDB from "@/config/database";
import RoleService from "@/services/roleServices";
import {
  success,
  serverError,
  validationError,
} from "@/utils/apiResponse";
import { z } from "zod";

const assignPermissionSchema = z.object({
  roleId: z
    .string()
    .min(1, "Role ID is required"),

  permissionIds: z
    .array(
      z.string().min(1)
    )
    .min(
      1,
      "At least one permission is required"
    ),
});

export async function PATCH(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();

    const body = await req.json();

    const validation =
      assignPermissionSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map(
        (error) => error.message
      );

      return validationError(errors, 422);
    }

    const service = RoleService;

    const result =
      await service.assignPermissions(
        validation.data.roleId,
        validation.data.permissionIds
      );

    return success(
      "Permissions assigned successfully.",
      result
    );
  } catch (error) {
    console.error(
      "ASSIGN_PERMISSION_ERROR:",
      error
    );

    if (error.statusCode) {
      return validationError(
        error.message,
        error.statusCode
      );
    }

    return serverError(
      "Unable to assign permissions."
    );
  }
}