import connectDB from "../../../../config/dbconnection";
import {
  success,
  serverError,
  validationError,
} from "../../../../utils/apiResponse";
import RoleService from "../../../../services/roleServices";
import { requireAdmin } from "../../../../utils/auth";
import { z } from "zod";

const updateRoleSchema = z.object({
  roleId: z
    .string()
    .min(1, "Role ID is required"),

  user_type: z
    .string()
    .trim()
    .min(2)
    .max(50)
    .optional(),

  description: z
    .string()
    .trim()
    .max(255)
    .optional(),

  permissions: z
    .array(z.string())
    .optional(),
});

export async function PATCH(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();

    const body = await req.json();

    const validation =
      updateRoleSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map(
        (error) => error.message
      );

      return validationError(errors, 422);
    }

    const {
      roleId,
      ...updateData
    } = validation.data;

    const service = RoleService;

    const result =
      await service.updateRole(
        roleId,
        updateData
      );

    return success(
      "Role updated successfully.",
      result
    );
  } catch (error) {
    console.error(
      "UPDATE_ROLE_ERROR:",
      error
    );

    if (error.statusCode) {
      return validationError(
        error.message,
        error.statusCode
      );
    }

    return serverError(
      "Unable to update role."
    );
  }
}