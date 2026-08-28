import { requireAdmin } from "../../../../utils/auth";
import connectDB from "../../../../config/dbconnection";
import RoleService from "../../../../services/roleServices";
import apiResponse from "../../../../utils/common/apiResponse";

import { z } from "zod";

const createRoleSchema = z.object({
  user_type: z
    .string()
    .trim()
    .min(2, "Role name is required")
    .max(50, "Role name is too long"),

  description: z
    .string()
    .trim()
    .max(255)
    .optional(),

  permissions: z
    .array(z.string())
    .optional()
    .default([]),
});

export async function POST(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();

    const body = await req.json();

    const validation =
      createRoleSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map(
        (error) => error.message
      );

      return apiResponse.validationError(
        "Validation failed.",
        errors,
        422
      );
    }

    const result =
      await RoleService.createRole(
        validation.data
      );

    return apiResponse.created(
      "Role created successfully.",
      result
    );
  } catch (error) {
    console.error(
      "CREATE_ROLE_ERROR:",
      error
    );

    return apiResponse.error(error);
  }
}
