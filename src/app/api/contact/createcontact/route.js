import connectDB from "@/config/database";
import ContactService from "@/services/contactServices";
import {
  success,
  serverError,
  validationError,
} from "@/utils/apiResponse";
import { z } from "zod";

const createContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required")
    .max(100),

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .min(7, "Invalid phone number")
    .max(20, "Invalid phone number")
    .optional(),

  subject: z
    .string()
    .trim()
    .max(200)
    .optional(),

  message: z
    .string()
    .trim()
    .min(5, "Message is required")
    .max(5000),
});

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const validation =
      createContactSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map(
        (error) => error.message
      );

      return validationError(errors, 422);
    }

    const service =
      new ContactService();

    const result =
      await service.createContact(
        validation.data
      );

    return success(
      "Contact created successfully.",
      result,
      201
    );
  } catch (error) {
    console.error(
      "CREATE_CONTACT_ERROR:",
      error
    );

    if (error.statusCode) {
      return validationError(
        error.message,
        error.statusCode
      );
    }

    return serverError(
      "Unable to create contact."
    );
  }
}