import crypto from "crypto";
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import { requireAdmin } from "../../../../utils/auth";
import connectDB from "../../../../config/dbconnection";
import apiResponse from "../../../../utils/common/apiResponse";

export const runtime = "nodejs";

const allowedTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

export async function POST(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("image");
    const folder = formData.get("folder") === "blogs" ? "blogs" : "gallery";
    if (!(file instanceof File) || file.size === 0)
      return apiResponse.validationError(
        "Validation failed.",
        ["An image file is required."],
        422,
      );
    if (!allowedTypes.has(file.type))
      return apiResponse.validationError(
        "Validation failed.",
        ["Only JPEG, PNG, WebP, and GIF images are supported."],
        415,
      );
    if (file.size > 8 * 1024 * 1024)
      return apiResponse.validationError(
        "Validation failed.",
        ["Image size must not exceed 8 MB."],
        413,
      );
    const fileName = `${Date.now()}-${crypto.randomUUID()}${allowedTypes.get(file.type)}`;
    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "uploads",
      folder,
    );
    await mkdir(uploadDirectory, { recursive: true });
    await writeFile(
      path.join(uploadDirectory, fileName),
      Buffer.from(await file.arrayBuffer()),
      { flag: "wx" },
    );
    return apiResponse.created("Image uploaded successfully.", {
      url: `/uploads/${folder}/${fileName}`,
      fileName,
      size: file.size,
      mimeType: file.type,
    });
  } catch (error) {
    console.error("UPLOAD_IMAGE_ERROR:", error);
    return apiResponse.error(error);
  }
}
