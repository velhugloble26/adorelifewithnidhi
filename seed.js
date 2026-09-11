import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "./src/config/dbconnection.js";
import { UserRoles, Users } from "./src/schema/schema.js";
import { ensureDefaultAccessControl } from "./src/services/accessControlServices.js";

const BCRYPT_ROUNDS = 12;

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be defined.");
  }

  await connectDB();

  const { permissionIds } = await ensureDefaultAccessControl();
  const adminRole = await UserRoles.findOneAndUpdate(
    { user_type: "admin" },
    {
      $set: {
        description: "Full access administrator",
        permissions: permissionIds,
        updated_at: new Date(),
      },
      $setOnInsert: { user_type: "admin" },
    },
    { upsert: true, returnDocument: "after" }
  );

  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    const existingRole = await UserRoles.findById(existingUser.role_id).select("user_type");
    if (existingRole?.user_type !== "admin") {
      throw new Error("A non-admin user already exists with ADMIN_EMAIL; refusing to change its role.");
    }

    console.log("Admin account already exists; role permissions are up to date.");
    return;
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const now = new Date();

  try {
    await Users.create({
      name: "Administrator",
      email,
      password: passwordHash,
      role_id: adminRole._id,
      status: "active",
      emailVerified: true,
      emailVerifiedAt: now,
      refreshTokens: [],
    });
    console.log("Admin account created successfully.");
  } catch (error) {
    if (error?.code === 11000) {
      console.log("Admin account already exists; no changes made.");
      return;
    }
    throw error;
  }
}

try {
  await seedAdmin();
} catch (error) {
  console.error("Admin seed failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
