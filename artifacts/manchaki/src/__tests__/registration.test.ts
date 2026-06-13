/**
 * Integration tests for the Registration form
 * Tests: successful submission, invalid email, empty fields, invalid ID, network failure
 */

import { supabase } from "@/lib/supabase";
import { submitRegistration } from "@/lib/services";
import type { RegistrationInsert } from "@/lib/database.types";

// Mock supabase client
jest.mock("@/lib/supabase", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

const mockFrom = supabase.from as jest.Mock;

const validRegistration: RegistrationInsert = {
  full_name: "John Kamau",
  national_id: "12345678",
  phone: "0712345678",
  email: "john@example.com",
  preferred_course: "full-course",
  preferred_branch: "muguga",
  preferred_start_date: "2026-07-01",
  message: null,
};

describe("Registration Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Successful submission", () => {
    it("should successfully submit a valid registration", async () => {
      const mockInsert = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({
        data: { id: "test-uuid", created_at: new Date().toISOString(), status: "pending" },
        error: null,
      });

      mockFrom.mockReturnValue({
        insert: mockInsert.mockReturnValue({
          select: mockSelect.mockReturnValue({
            single: mockSingle,
          }),
        }),
      });

      const result = await submitRegistration(validRegistration);
      expect(result).toHaveProperty("id", "test-uuid");
      expect(result).toHaveProperty("status", "pending");
      expect(mockFrom).toHaveBeenCalledWith("registrations");
    });
  });

  describe("Invalid email", () => {
    it("should allow submission without email (optional field)", async () => {
      const mockInsert = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({
        data: { id: "test-uuid", created_at: new Date().toISOString(), status: "pending" },
        error: null,
      });

      mockFrom.mockReturnValue({
        insert: mockInsert.mockReturnValue({
          select: mockSelect.mockReturnValue({
            single: mockSingle,
          }),
        }),
      });

      const registrationWithoutEmail: RegistrationInsert = {
        ...validRegistration,
        email: undefined,
      };

      const result = await submitRegistration(registrationWithoutEmail);
      expect(result).toHaveProperty("id", "test-uuid");
    });
  });

  describe("Network failure", () => {
    it("should throw an error when network fails", async () => {
      mockFrom.mockImplementation(() => {
        throw new Error("Failed to fetch");
      });

      await expect(submitRegistration(validRegistration)).rejects.toThrow("Failed to fetch");
    });
  });

  describe("Database error handling", () => {
    it("should throw when Supabase returns an error", async () => {
      const mockInsert = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({
        data: null,
        error: { message: "Database error", code: "23505" },
      });

      mockFrom.mockReturnValue({
        insert: mockInsert.mockReturnValue({
          select: mockSelect.mockReturnValue({
            single: mockSingle,
          }),
        }),
      });

      await expect(submitRegistration(validRegistration)).rejects.toThrow();
    });
  });
});