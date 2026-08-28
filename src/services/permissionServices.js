import { Permissions } from "../modal/schema";

import {
  BadRequestError,
  NotFoundError,
  ConflictError,
} from "../utils/common/errorhandlers";

class PermissionService {
  async createPermission({
    key,
    description,
    module,
  }) {
    if (!key) {
      throw BadRequestError(
        "Permission key is required."
      );
    }

    const normalizedKey = key.trim().toLowerCase();

    const existing = await Permissions.findOne({
      key: normalizedKey,
    });

    if (existing) {
      throw ConflictError(
        "Permission already exists.",
        "PERMISSION_ALREADY_EXISTS"
      );
    }

    const permission = await Permissions.create({
      key: normalizedKey,
      description: description?.trim(),
      module: module?.trim(),
    });

    return permission;
  }

  async getPermissionById(permissionId) {
    const permission = await Permissions.findById(
      permissionId
    );

    if (!permission) {
      throw NotFoundError(
        "Permission not found."
      );
    }

    return permission;
  }

  async getPermissionByKey(key) {
    const permission = await Permissions.findOne({
      key: key.trim().toLowerCase(),
    });

    if (!permission) {
      throw NotFoundError(
        "Permission not found."
      );
    }

    return permission;
  }

  async getAllPermissions({
    module,
    search,
    page = 1,
    limit = 20,
  } = {}) {
    const filter = {};

    if (module) {
      filter.module = module.trim();
    }

    if (search) {
      filter.$or = [
        {
          key: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const skip = (page - 1) * limit;

    const [permissions, total] =
      await Promise.all([
        Permissions.find(filter)
          .sort({
            module: 1,
            key: 1,
          })
          .skip(skip)
          .limit(limit),

        Permissions.countDocuments(filter),
      ]);

    return {
      data: permissions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updatePermission(
    permissionId,
    {
      key,
      description,
      module,
    }
  ) {
    const permission =
      await Permissions.findById(permissionId);

    if (!permission) {
      throw NotFoundError(
        "Permission not found."
      );
    }

    if (key) {
      const normalizedKey =
        key.trim().toLowerCase();

      const duplicate =
        await Permissions.findOne({
          key: normalizedKey,
          _id: {
            $ne: permissionId,
          },
        });

      if (duplicate) {
        throw ConflictError(
          "Permission key already exists.",
          "PERMISSION_ALREADY_EXISTS"
        );
      }

      permission.key = normalizedKey;
    }

    if (description !== undefined) {
      permission.description =
        description.trim();
    }

    if (module !== undefined) {
      permission.module = module.trim();
    }

    permission.updated_at = new Date();

    await permission.save();

    return permission;
  }

  async deletePermission(permissionId) {
    const permission =
      await Permissions.findById(permissionId);

    if (!permission) {
      throw NotFoundError(
        "Permission not found."
      );
    }

    // Before deleting a permission, make sure
    // no role currently uses it.
    const { UserRoles } = await import("../modal/schema");

    const roleUsingPermission =
      await UserRoles.findOne({
        permissions: permissionId,
      });

    if (roleUsingPermission) {
      throw BadRequestError(
        `Permission is assigned to role '${roleUsingPermission.user_type}'. Remove it from the role first.`,
        "PERMISSION_IN_USE"
      );
    }

    await Permissions.deleteOne({
      _id: permissionId,
    });

    return {
      message: "Permission deleted successfully.",
    };
  }
}

export default new PermissionService();