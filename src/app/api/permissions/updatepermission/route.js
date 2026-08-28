import { requireAdmin } from "@/utils/auth";
import connectDB from "@/config/database";
import PermissionService from "@/services/permissionServices";
import {
  success,
  serverError,
  validationError,
} from "@/utils/apiResponse";
import { z } from "zod";

const updatePermissionSchema = z.object({
  permissionId: z
    .string()
    .min(1, "Permission ID is required"),

  key: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  description: z
    .string()
    .trim()
    .max(255)
    .optional(),

  module: z
    .string()
    .trim()
    .max(100)
    .optional(),
});

export async function PATCH(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();

    const body = await req.json();

    const validation =
      updatePermissionSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map(
        (error) => error.message
      );

      return validationError(errors, 422);
    }

    const {
      permissionId,
      ...updateData
    } = validation.data;

    const service = PermissionService;

    const result =
      await service.updatePermission(
        permissionId,
        updateData
      );

    return success(
      "Permission updated successfully.",
      result
    );
  } catch (error) {
    console.error(
      "UPDATE_PERMISSION_ERROR:",
      error
    );

    if (error.statusCode) {
      return validationError(
        error.message,
        error.statusCode
      );
    }

    return serverError(
      "Unable to update permission."
    );
  }
}