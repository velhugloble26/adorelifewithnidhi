import connectDB from "../../../../config/dbconnection";
import {
  success,
  serverError,
} from "../../../../utils/apiResponse";
import ContactService from "../../../../services/contactServices";
import { requireAdmin } from "../../../../utils/auth";

export async function GET(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();

    const { searchParams } =
      new URL(req.url);

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        Number(searchParams.get("limit")) || 20,
        1
      ),
      100
    );

    const search =
      searchParams.get("search") || undefined;

    const service =
      new ContactService();

    const result =
      await service.getAllContacts({
        page,
        limit,
        search,
      });

    return success(
      "Contacts fetched successfully.",
      result
    );
  } catch (error) {
    console.error(
      "GET_CONTACTS_ERROR:",
      error
    );

    return serverError(
      "Unable to fetch contacts."
    );
  }
}