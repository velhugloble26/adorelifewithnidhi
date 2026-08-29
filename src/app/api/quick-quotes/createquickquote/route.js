import connectDB from "../../../../config/dbconnection";
import {
  success,
  serverError,
  validationError,
} from "../../../../utils/apiResponse";
import QuickQuoteService from "../../../../services/quickQuoteServices";

import { z } from "zod";

const createQuickQuoteSchema = z.object({
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
    .optional()
    .or(z.literal("")),

  service: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal("")),

  preferredSession: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal("")),

  preferredFormat: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .max(5000)
    .optional()
    .or(z.literal("")),
});

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const validation =
      createQuickQuoteSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map(
        (error) => error.message
      );

      return validationError(errors, 422);
    }

    const service =
      new QuickQuoteService();

    const result =
      await service.createQuickQuote(
        validation.data
      );

    return success(
      "Quick quote created successfully.",
      result,
      201
    );
  } catch (error) {
    console.error(
      "CREATE_QUICK_QUOTE_ERROR:",
      error
    );

    if (error.statusCode) {
      return validationError(
        error.message,
        error.statusCode
      );
    }

    return serverError(
      "Unable to create quick quote."
    );
  }
}