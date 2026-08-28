
import { Permissions, UserRoles, Users } from "../schema/schema";
import { BadRequestError, ConflictError, NotFoundError } from "../utils/common/errorhandlers";

export const USER_TYPES = ["user", "admin", "sales"];

class RoleService {
  async createRole({
    user_type,
    description,
    permissions = [],
  }) {
    if (!user_type) {
      throw BadRequestError(
        "Role type is required."
      );
    }

    const normalizedType = user_type.trim().toLowerCase();
    if (!USER_TYPES.includes(normalizedType)) {
      throw BadRequestError("Role type must be one of: user, admin, or sales.", "INVALID_ROLE_TYPE");
    }

    const existing = await UserRoles.findOne({
      user_type: normalizedType,
    });

    if (existing) {
      throw ConflictError(
        "Role already exists.",
        "ROLE_ALREADY_EXISTS"
      );
    }

    const permissionIds = normalizedType === "admin"
      ? (await Permissions.find({}).select("_id")).map((permission) => permission._id)
      : await this.validatePermissions(permissions);

    const role = await UserRoles.create({
      user_type: normalizedType,
      description: description?.trim(),
      permissions: permissionIds,
    });

    return this.getRoleById(role._id);
  }

  async validatePermissions(
    permissionIds = []
  ) {
    if (!Array.isArray(permissionIds)) {
      throw BadRequestError(
        "Permissions must be an array."
      );
    }

    if (permissionIds.length === 0) {
      return [];
    }

    const permissions =
      await Permissions.find({
        _id: {
          $in: permissionIds,
        },
      }).select("_id");

    if (
      permissions.length !== permissionIds.length
    ) {
      throw BadRequestError(
        "One or more permissions are invalid.",
        "INVALID_PERMISSION"
      );
    }

    return permissions.map(
      (permission) => permission._id
    );
  }

  async getRoleById(roleId) {
    const role = await UserRoles.findById(
      roleId
    ).populate("permissions");

    if (!role) {
      throw NotFoundError(

        
        "Role not found."
      );
    }

    return role;
  }

  async getRoleByType(userType) {
    const role = await UserRoles.findOne({
      user_type: userType
        .trim()
        .toLowerCase(),
    }).populate("permissions");

    if (!role) {
      throw NotFoundError(
        "Role not found."
      );
    }

    return role;
  }

  async getAllRoles() {
    return UserRoles.find({})
      .populate("permissions")
      .sort({
        user_type: 1,
      });
  }

  async updateRole(
    roleId,
    {
      user_type,
      description,
      permissions,
    }
  ) {
    const role =
      await UserRoles.findById(roleId);

    if (!role) {
      throw NotFoundError(
        "Role not found."
      );
    }

    if (user_type) {
      const normalizedType = user_type.trim().toLowerCase();
      if (!USER_TYPES.includes(normalizedType)) {
        throw BadRequestError("Role type must be one of: user, admin, or sales.", "INVALID_ROLE_TYPE");
      }
      const duplicate = await UserRoles.findOne({
        user_type: normalizedType,
        _id: { $ne: roleId },
      });

      if (duplicate) {
        throw ConflictError(
          "Role already exists.",
          "ROLE_ALREADY_EXISTS"
        );
      }

      role.user_type = normalizedType;
    }

    if (description !== undefined) {
      role.description =
        description.trim();
    }

    if (permissions !== undefined) {
      role.permissions = await this.validatePermissions(permissions);
    }

    if (role.user_type === "admin") {
      role.permissions = (await Permissions.find({}).select("_id")).map((permission) => permission._id);
    }

    role.updated_at = new Date();

    await role.save();

    return this.getRoleById(role._id);
  }

  async assignPermissions(
    roleId,
    permissionIds
  ) {
    const role =
      await UserRoles.findById(roleId);

    if (!role) {
      throw NotFoundError(
        "Role not found."
      );
    }
    role.permissions = role.user_type === "admin"
      ? (await Permissions.find({}).select("_id")).map((permission) => permission._id)
      : await this.validatePermissions(permissionIds);

    role.updated_at = new Date();

    await role.save();

    return this.getRoleById(role._id);
  }

  async addPermission(
    roleId,
    permissionId
  ) {
    const role =
      await UserRoles.findById(roleId);

    if (!role) {
      throw NotFoundError(
        "Role not found."
      );
    }

    const permission =
      await Permissions.findById(
        permissionId
      );

    if (!permission) {
      throw NotFoundError(
        "Permission not found."
      );
    }

    const alreadyAssigned =
      role.permissions.some(
        (id) =>
          id.toString() ===
          permissionId.toString()
      );

    if (!alreadyAssigned) {
      role.permissions.push(
        permission._id
      );
    }

    await role.save();

    return this.getRoleById(role._id);
  }

  async removePermission(
    roleId,
    permissionId
  ) {
    const role =
      await UserRoles.findById(roleId);

    if (!role) {
      throw NotFoundError(
        "Role not found."
      );
    }

    if (role.user_type === "admin") {
      role.permissions = (await Permissions.find({}).select("_id")).map((permission) => permission._id);
    } else {
      role.permissions = role.permissions.filter(
        (id) =>
          id.toString() !==
          permissionId.toString()
      );
    }

    await role.save();

    return this.getRoleById(role._id);
  }

  async deleteRole(roleId) {
    const role =
      await UserRoles.findById(roleId);

    if (!role) {
      throw NotFoundError(
        "Role not found."
      );
    }

    // Never allow deleting a role
    // which is assigned to users.
    const usersUsingRole =
      await Users.countDocuments({
        role_id: roleId,
      });

    if (usersUsingRole > 0) {
      throw BadRequestError(
        `Cannot delete this role because ${usersUsingRole} user(s) are using it.`,
        "ROLE_IN_USE"
      );
    }

    await UserRoles.deleteOne({
      _id: roleId,
    });

    return {
      message: "Role deleted successfully.",
    };
  }
}

export default new RoleService();