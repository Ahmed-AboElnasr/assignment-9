import { HttpError } from "./index.js";

export class BadRequestException extends HttpError {
  constructor(message = "bad request", data = {}) {
    super(message, 400, "BAD_REQUEST_ERROR", data);  
  }
}

export class UnauthorizedException extends HttpError {
  constructor(message = "Invalid email or password", data = {}) {
    super(message, 401, "UNAUTHORIZED_ERROR", data);
  }
}

export class NotFoundException extends HttpError {
  constructor(message = "not found", data = {}) {
    super(message, 404, "NOT_FOUND_ERROR", data);
  }
}

export class ConflictException extends HttpError {
  constructor(message = "conflict", data = {}) {
    super(message, 409, "CONFLICT_ERROR", data);
  }
}
