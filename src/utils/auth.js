import jwt from "jsonwebtoken";
import { UserRoles, Users } from "../schema/schema";
import apiResponse from "./common/apiResponse";

export async function getAuthenticatedUser(req) {
  const cookieToken = req.cookies?.get("accessToken")?.value;
  const authorization = req.headers.get("authorization") || (cookieToken ? "Bearer " + cookieToken : "");
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return null;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (payload.type !== "access") return null;

    const user = await Users.findById(payload.sub).select("-password -refreshTokens").populate({ path: "role_id" });
    if (!user) return null;

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role_id?.user_type || payload.role,
      roleId: user.role_id?._id || payload.role_id,
    };
  } catch {
    return null;
  }
}

export async function requireRole(req, allowedRoles = ["admin"]) {
  const user = await getAuthenticatedUser(req);

  if (!user) {
    return { error: apiResponse.unauthorized("A bearer access token is required.") };
  }

  const role = await UserRoles.findById(user.roleId).select("user_type permissions");
  if (!role || !allowedRoles.includes(role.user_type)) {
    return { error: apiResponse.forbidden("You do not have permission to perform this action.") };
  }

  return { user: { id: user.id, email: user.email, role: role.user_type, roleId: role._id } };
}

export async function requireAdmin(req) {
  return requireRole(req, ["admin"]);
}
