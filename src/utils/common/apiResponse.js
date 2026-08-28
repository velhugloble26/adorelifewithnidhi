import { NextResponse } from "next/server";
import { getErrorResponse } from "./errorhandlers";

class ApiResponse {
  success(
    message = "Success",
    data = null,
    statusCode = 200
  ) {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      {
        status: statusCode,
      }
    );
  }

  created(
    message = "Created successfully",
    data = null
  ) {
    return this.success(
      message,
      data,
      201
    );
  }

  validationError(
    message = "Validation failed.",
    errors = null,
    statusCode = 422
  ) {
    return NextResponse.json(
      {
        success: false,
        message,
        errors,
      },
      {
        status: statusCode,
      }
    );
  }

  badRequest(
    message = "Bad request.",
    errors = null
  ) {
    return NextResponse.json(
      {
        success: false,
        message,
        errors,
      },
      {
        status: 400,
      }
    );
  }

  unauthorized(
    message = "Unauthorized."
  ) {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 401,
      }
    );
  }

  forbidden(
    message = "Access denied."
  ) {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 403,
      }
    );
  }

  notFound(
    message = "Resource not found."
  ) {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 404,
      }
    );
  }

  conflict(
    message = "Resource already exists."
  ) {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 409,
      }
    );
  }

  unprocessableEntity(
    message = "Unprocessable entity.",
    errors = null
  ) {
    return NextResponse.json(
      {
        success: false,
        message,
        errors,
      },
      {
        status: 422,
      }
    );
  }

  serverError(
    message = "Internal server error."
  ) {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 500,
      }
    );
  }

  error(error) {
    const response = getErrorResponse(error);

    return NextResponse.json(
      {
        success: false,
        message: response.message,
        code: response.code,
        ...(response.errors
          ? { errors: response.errors }
          : {}),
      },
      {
        status: response.statusCode || 500,
      }
    );
  }
}

export default new ApiResponse();
