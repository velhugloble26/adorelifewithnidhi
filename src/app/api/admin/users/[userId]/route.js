import { z } from "zod";
import connectDB from "../../../../../config/dbconnection";
import { Users, UserRoles } from "../../../../../schema/schema";
import RoleService from "../../../../../services/roleServices";
import { requireAdmin } from "../../../../../utils/auth";
import { success, serverError, validationError } from "../../../../../utils/apiResponse";

const updateUserSchema = z.object({
  roleId: z.string().min(1, "Role ID is required").optional(),
  status: z.enum(["active", "inactive", "suspended"]).optional(),
  phone: z.string().trim().max(20).optional(),
  permissions: z.array(z.string()).optional(),
});

export async function PATCH(req, { params }) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();

    const body = await req.json();
    const validation = updateUserSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => issue.message);
      return validationError(errors, 422);
    }

    const { userId } = await params;
    const user = await Users.findById(userId).populate({
      path: "role_id",
      populate: { path: "permissions" },
    });

    if (!user) {
      return validationError("User not found.", 404);
    }

    const nextRoleId = validation.data.roleId || user.role_id?._id?.toString();
    if (nextRoleId) {
      const role = await UserRoles.findById(nextRoleId).populate("permissions");
      if (!role) {
        return validationError("Selected role does not exist.", 400);
      }

      user.role_id = role._id;
      if (Array.isArray(validation.data.permissions)) {
        if (role.user_type === "admin") {
          role.permissions = (await UserRoles.populate ? [] : []).map(() => null);
        } else {
          role.permissions = await RoleService.validatePermissions(validation.data.permissions);
        }
        await role.save();
      }
    }

    if (validation.data.status) {
      user.status = validation.data.status;
    }

    if (validation.data.phone !== undefined) {
      user.phone = validation.data.phone.trim();
    }

    await user.save();

    const updatedUser = await Users.findById(userId).populate({
      path: "role_id",
      populate: { path: "permissions" },
    });

    return success("User updated successfully.", {
      _id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone || "",
      status: updatedUser.status || "active",
      created_at: updatedUser.created_at,
      role: updatedUser.role_id ? {
        _id: updatedUser.role_id._id.toString(),
        user_type: updatedUser.role_id.user_type,
        permissions: updatedUser.role_id.permissions || [],
      } : null,
    });
  } catch (error) {
    console.error("UPDATE_ADMIN_USER_ERROR:", error);
    if (error.statusCode) {
      return validationError(error.message, error.details || null, error.statusCode);
    }
    return serverError("Unable to update user.");
  }
}
