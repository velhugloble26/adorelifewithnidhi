import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "../../../../utils/auth";
import connectDB from "../../../../config/dbconnection";
import apiResponse from "../../../../utils/common/apiResponse";

export const runtime = "nodejs";

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("image");
    const folder = formData.get("folder") || "general";

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

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return apiResponse.error(new Error("Cloudinary configuration is missing."));
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: String(folder),
          resource_type: "image",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, uploadResult) => {
          if (error) return reject(error);
          resolve(uploadResult);
        },
      );

      uploadStream.end(buffer);
    });

    return apiResponse.created("Image uploaded successfully.", {
      url: result.secure_url,
      fileName: result.public_id,
      size: file.size,
      mimeType: file.type,
      cloudinary: {
        publicId: result.public_id,
        format: result.format,
      },
    });
  } catch (error) {
    console.error("UPLOAD_IMAGE_ERROR:", error);
    return apiResponse.error(error);
  }
}
