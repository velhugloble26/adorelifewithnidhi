import connectDB from "../../../../config/dbconnection";
import { Users, UserRoles } from "../../../../schema/schema";
import { requireAdmin } from "../../../../utils/auth";
import { success, serverError } from "../../../../utils/apiResponse";

export async function GET(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;

    await connectDB();
    const { searchParams } = new URL(req.url);

    const filter = {};
    const search = searchParams.get("search");
    const status = searchParams.get("status");

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "all") {
      filter.status = status;
    }

    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const limit = Math.min(Math.max(Number(searchParams.get("limit") || 50), 1), 200);
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      Users.find(filter)
        .populate({
          path: "role_id",
          populate: { path: "permissions" },
        })
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Users.countDocuments(filter),
    ]);

    const mappedUsers = users.map((user) => ({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      status: user.status || "active",
      created_at: user.created_at,
      role_id: user.role_id?._id?.toString?.() || user.role_id?.toString?.() || null,
      role: user.role_id ? {
        _id: user.role_id._id.toString(),
        user_type: user.role_id.user_type,
        description: user.role_id.description || "",
        permissions: user.role_id.permissions || [],
      } : null,
      permissions: user.role_id?.permissions?.map((permission) => permission._id?.toString?.() || permission.toString?.()) || [],
    }));

    return success("Users fetched successfully.", {
      data: mappedUsers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET_ADMIN_USERS_ERROR:", error);
    return serverError("Unable to fetch users.");
  }
}
