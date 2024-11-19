import { BaseError } from './BaseError';

export class NotInitializedError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name; // NotInitializedError
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name; // NotFoundError
  }
}

export class InvalidDataError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name; // InvalidDataError
  }
}

export class ApiError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name; // ApiError
  }
}

export class PermissionError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name; // PermissionError
  }
}

export class AlreadyExsistError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name; // AlreadyExsistError
  }
}

export function isNotInitializedError(
  error: unknown,
): error is NotInitializedError {
  return error instanceof NotInitializedError;
}

export function isNotFoundError(error: unknown): error is NotFoundError {
  return error instanceof NotFoundError;
}

export function isInvalidDataError(error: unknown): error is InvalidDataError {
  return error instanceof InvalidDataError;
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function isAlreadyExsistError(
  error: unknown,
): error is AlreadyExsistError {
  return error instanceof AlreadyExsistError;
}
