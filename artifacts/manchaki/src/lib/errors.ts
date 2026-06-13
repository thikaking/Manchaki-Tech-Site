/**
 * Centralized Error Handling for Manchaki Driving School
 * 
 * Provides:
 * - User-friendly error messages
 * - Console logging for development
 * - Production-safe error responses
 * - Structured error types
 */

/** Application error codes mapped to user-friendly messages */
const ERROR_MESSAGES: Record<string, string> = {
  NETWORK_ERROR:
    "Unable to connect to the server. Please check your internet connection and try again.",
  VALIDATION_ERROR:
    "Please check your input and try again. Some fields may be incorrect.",
  DUPLICATE_SUBMISSION:
    "This form was already submitted. Please wait for our response.",
  RATE_LIMIT:
    "Too many requests. Please wait a moment and try again.",
  UNKNOWN:
    "Something went wrong. Please try again later.",
  DATABASE_ERROR:
    "We couldn't save your information. Please try again.",
  INVALID_EMAIL:
    "Please enter a valid email address.",
  INVALID_PHONE:
    "Please enter a valid phone number.",
  MISSING_FIELD:
    "Please fill in all required fields.",
};

/** Structured application error */
export class AppError extends Error {
  public readonly code: string;
  public readonly userMessage: string;
  public readonly timestamp: string;
  public readonly originalError?: unknown;

  constructor(code: string, originalError?: unknown) {
    const userMessage = ERROR_MESSAGES[code] || ERROR_MESSAGES.UNKNOWN;
    super(userMessage);

    this.name = "AppError";
    this.code = code;
    this.userMessage = userMessage;
    this.timestamp = new Date().toISOString();
    this.originalError = originalError;

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

/** Error severity levels */
export type ErrorSeverity = "info" | "warning" | "error" | "critical";

/** Log an error with appropriate context and severity */
export function logError(
  error: unknown,
  context?: string,
  severity: ErrorSeverity = "error"
): void {
  const timestamp = new Date().toISOString();
  const prefix = `[${severity.toUpperCase()}] ${timestamp}`;

  if (error instanceof AppError) {
    console.error(
      `${prefix} ${context ? `[${context}] ` : ""}Code: ${error.code}`,
      `Message: ${error.userMessage}`,
      error.originalError || ""
    );
  } else if (error instanceof Error) {
    console.error(
      `${prefix} ${context ? `[${context}] ` : ""}${error.name}: ${error.message}`,
      error.stack
    );
  } else {
    console.error(`${prefix} ${context ? `[${context}] ` : ""}Unknown error:`, error);
  }

  // In production, send to error monitoring service
  if (import.meta.env.PROD) {
    // TODO: Integrate with error monitoring service (e.g., Sentry)
    // sendToErrorMonitoring(error, context, severity);
  }
}

/** Extract a user-friendly error message from any error */
export function getUserFriendlyErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.userMessage;
  }

  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }
    if (error.message.includes("timeout") || error.message.includes("Timeout")) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }
    if (error.message.includes("429") || error.message.includes("Too Many Requests")) {
      return ERROR_MESSAGES.RATE_LIMIT;
    }
    if (error.message.includes("duplicate") || error.message.includes("Unique constraint")) {
      return ERROR_MESSAGES.DUPLICATE_SUBMISSION;
    }

    // Supabase specific errors
    if (error.message.includes("violates row-level security")) {
      return ERROR_MESSAGES.DATABASE_ERROR;
    }
  }

  return ERROR_MESSAGES.UNKNOWN;
}

/** Safe async wrapper that catches and logs errors */
export async function safeAsync<T>(
  promise: Promise<T>,
  errorContext?: string
): Promise<{ data: T | null; error: AppError | null }> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (err) {
    const appError =
      err instanceof AppError
        ? err
        : new AppError("UNKNOWN", err);

    logError(appError, errorContext);
    return { data: null, error: appError };
  }
}