import { requireAdmin } from "@/utils/auth";
import connectDB from "@/config/database";
import PermissionService from "@/services/permissionServices";
import {
  success,
  serverError,
  validationError,
} from "@/utils/apiResponse";
import { z } from "zod";

const createPermissionSchema = z.object({
  key: z
    .string()
    .trim()
    .min(2, "Permission key is required")
    .max(100, "Permission key is too long"),

  description: z
    .string()
    .trim()
    .max(255, "Description is too long")
    .optional(),

  module: z
    .string()
    .trim()
    .max(100, "Module name is too long")
    .optional(),
});

export async function POST(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();

    const body = await req.json();

    const validation =
      createPermissionSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map(
        (error) => error.message
      );

      return validationError(errors, 422);
    }

    const service = PermissionService;

    const result =
      await service.createPermission(
        validation.data
      );

    return success(
      "Permission created successfully.",
      result
    );
  } catch (error) {
    console.error(
      "CREATE_PERMISSION_ERROR:",
      error
    );

    if (error.statusCode) {
      return validationError(
        error.message,
        error.statusCode
      );
    }

    return serverError(
      "Unable to create permission."
    );
  }
}