/**
 * Integration tests for the Contact form
 * Tests: successful submission, validation errors, network failure
 */

import { supabase } from "@/lib/supabase";
import { submitContactMessage } from "@/lib/services";
import type { ContactMessageInsert } from "@/lib/database.types";

// Mock supabase client
jest.mock("@/lib/supabase", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

const mockFrom = supabase.from as jest.Mock;

const validMessage: ContactMessageInsert = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "0712345678",
  message: "I would like to enroll in the full driving course at your Thika branch. Please send me more information about the fees and schedule.",
};

describe("Contact Message Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Successful submission", () => {
    it("should successfully submit a valid contact message", async () => {
      const mockInsert = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({
        data: { id: "test-uuid", created_at: new Date().toISOString(), status: "new" },
        error: null,
      });

      mockFrom.mockReturnValue({
        insert: mockInsert.mockReturnValue({
          select: mockSelect.mockReturnValue({
            single: mockSingle,
          }),
        }),
      });

      const result = await submitContactMessage(validMessage);
      expect(result).toHaveProperty("id", "test-uuid");
      expect(result).toHaveProperty("status", "new");
      expect(mockFrom).toHaveBeenCalledWith("contact_messages");
    });
  });

  describe("Validation errors", () => {
    it("should allow submission without phone (optional field)", async () => {
      const mockInsert = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({
        data: { id: "test-uuid", created_at: new Date().toISOString(), status: "new" },
        error: null,
      });

      mockFrom.mockReturnValue({
        insert: mockInsert.mockReturnValue({
          select: mockSelect.mockReturnValue({
            single: mockSingle,
          }),
        }),
      });

      const messageWithoutPhone: ContactMessageInsert = {
        ...validMessage,
        phone: undefined,
      };

      const result = await submitContactMessage(messageWithoutPhone);
      expect(result).toHaveProperty("id", "test-uuid");
    });
  });

  describe("Network failure", () => {
    it("should throw an error when network fails", async () => {
      mockFrom.mockImplementation(() => {
        throw new Error("NetworkError");
      });

      await expect(submitContactMessage(validMessage)).rejects.toThrow("NetworkError");
    });
  });

  describe("Database error handling", () => {
    it("should throw when Supabase returns an error", async () => {
      const mockInsert = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({
        data: null,
        error: { message: "Database error", code: "P0001" },
      });

      mockFrom.mockReturnValue({
        insert: mockInsert.mockReturnValue({
          select: mockSelect.mockReturnValue({
            single: mockSingle,
          }),
        }),
      });

      await expect(submitContactMessage(validMessage)).rejects.toThrow();
    });
  });
});