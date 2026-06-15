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
  DATABASE_CONNECTION_FAILED:
    "Database connection failed. Please try again later or contact support.",
  SUPABASE_CONFIGURATION_MISSING:
    "Supabase configuration missing. Please contact the website administrator.",
  PERMISSION_DENIED:
    "Permission denied. You do not have access to perform this action.",
  REQUIRED_FIELDS_MISSING:
    "Required fields missing. Please fill in all required fields.",
  REGISTRATION_TABLE_NOT_FOUND:
    "Registration table not found. Please contact the website administrator.",
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
    const msg = error.message;

    // Handle specific error types
    if (msg.includes("Failed to fetch") || msg.includes("NetworkError") || msg.includes("fetch is not defined")) {
      return "Database connection failed. Please check your internet connection and try again.";
    }
    if (msg.includes("timeout") || msg.includes("Timeout")) {
      return "Database connection failed. The server took too long to respond. Please try again.";
    }
    if (msg.includes("429") || msg.includes("Too Many Requests")) {
      return ERROR_MESSAGES.RATE_LIMIT;
    }
    if (msg.includes("duplicate") || msg.includes("Unique constraint") || msg.includes("23505")) {
      return ERROR_MESSAGES.DUPLICATE_SUBMISSION;
    }

    // Supabase specific errors
    if (msg.includes("violates row-level security") || msg.includes("permission denied") || msg.includes("42501")) {
      return "Permission denied. The registration table exists but the RLS insert policy is missing. Please run the SQL migration in Supabase Dashboard → SQL Editor.";
    }
    if (msg.includes("relation") && (msg.includes("does not exist") || msg.includes("registrations"))) {
      return "Registration table not found. Please contact the website administrator.";
    }
    if (msg.includes("column") && msg.includes("does not exist")) {
      return "Registration table not found. Please contact the website administrator.";
    }
    if (msg.includes("connect") && msg.includes("ECONNREFUSED")) {
      return "Database connection failed. Could not reach the server. Please try again later.";
    }
    if (msg.includes("42P01") || msg.includes("table") && msg.includes("not found")) {
      return "Registration table not found. Please contact the website administrator.";
    }
    if (msg.includes("JWT") || msg.includes("invalid api key") || msg.includes("401")) {
      return "Supabase configuration missing. Please contact the website administrator.";
    }
    if (msg.includes("400") || msg.includes("bad request")) {
      return "Required fields missing. Please check your input and try again.";
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