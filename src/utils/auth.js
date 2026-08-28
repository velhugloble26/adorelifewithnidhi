import jwt from "jsonwebtoken";
import { UserRoles } from "@/modal/schema";
import apiResponse from "@/utils/common/apiResponse";

export async function requireRole(req, allowedRoles = ["admin"]) {
  const cookieToken = req.cookies?.get("accessToken")?.value;
  const authorization = req.headers.get("authorization") || (cookieToken ? "Bearer " + cookieToken : "");
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return { error: apiResponse.unauthorized("A bearer access token is required.") };
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (payload.type !== "access") throw new Error("Wrong token type");
    const role = await UserRoles.findById(payload.role_id).select("user_type permissions");
    if (!role || payload.role !== role.user_type || !allowedRoles.includes(role.user_type)) {
      return { error: apiResponse.forbidden("You do not have permission to perform this action.") };
    }
    return { user: { id: payload.sub, email: payload.email, role: role.user_type, roleId: role._id } };
  } catch {
    return { error: apiResponse.unauthorized("Invalid or expired access token.") };
  }
}

export async function requireAdmin(req) {
  return requireRole(req, ["admin"]);
}
