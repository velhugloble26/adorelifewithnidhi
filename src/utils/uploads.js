import path from "path";
import { unlink } from "fs/promises";

export async function deleteLocalUpload(publicUrl) {
  if (typeof publicUrl !== "string" || !publicUrl.startsWith("/uploads/")) return;
  const publicRoot = path.join(process.cwd(), "public");
  const filePath = path.resolve(publicRoot, publicUrl.slice(1));
  if (!filePath.startsWith(`${publicRoot}${path.sep}`)) return;
  await unlink(filePath).catch((error) => { if (error.code !== "ENOENT") throw error; });
}
