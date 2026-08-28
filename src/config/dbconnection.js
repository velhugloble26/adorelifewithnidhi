import mongoose from "mongoose";
import { ensureDefaultAccessControl } from "../services/accessControlServices.js";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, accessControlPromise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    if (!cached.accessControlPromise) cached.accessControlPromise = ensureDefaultAccessControl();
    await cached.accessControlPromise;
    return cached.conn;
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    cached.accessControlPromise = ensureDefaultAccessControl();
    await cached.accessControlPromise;
    console.log("MongoDB connected");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.accessControlPromise = null;
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;
