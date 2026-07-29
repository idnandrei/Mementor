import type {
  ErrorResponse,
  HttpValidationError,
} from "@/generated/api/types.gen";

export type ApiError = ErrorResponse | HttpValidationError;

export function getApiErrorMessage(error: ApiError): string {
  if (typeof error.detail === "string") {
    return error.detail;
  }

  const validationMessage = error.detail?.[0]?.msg;

  if (validationMessage) {
    return validationMessage;
  }

  return "Something went wrong.";
}
