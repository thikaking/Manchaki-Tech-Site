/**
 * Supabase Database Type Definitions
 * 
 * This file contains TypeScript types for the Manchaki Technical Training Institute and Driving School database schema.
 * Generated based on the SQL migration schema.
 * 
 * To regenerate from your Supabase project:
 * 1. Install supabase CLI: npm install -g supabase
 * 2. Run: supabase gen types typescript --project-id yzllxlvuewkpnjvdicbv > src/lib/database.types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      registrations: {
        Row: RegistrationRow;
        Insert: RegistrationInsert;
        Update: Partial<RegistrationInsert>;
        Relationships: [];
      };
      contact_messages: {
        Row: ContactMessageRow;
        Insert: ContactMessageInsert;
        Update: Partial<ContactMessageInsert>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      registration_status: "pending" | "approved" | "rejected" | "cancelled";
      message_status: "new" | "read" | "archived";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

/** Registration status enum values */
export type RegistrationStatus = "pending" | "approved" | "rejected" | "cancelled";

/** Contact message status enum values */
export type MessageStatus = "new" | "read" | "archived";

/** Registration record from the database */
export interface RegistrationRow {
  id: string;
  created_at: string;
  full_name: string;
  national_id: string;
  phone: string;
  email: string | null;
  preferred_course: string;
  preferred_branch: string;
  preferred_start_date: string;
  message: string | null;
  status: RegistrationStatus;
}

/** Data required to insert a registration record */
export interface RegistrationInsert {
  full_name: string;
  national_id: string;
  phone: string;
  email?: string | null;
  preferred_course: string;
  preferred_branch: string;
  preferred_start_date: string;
  message?: string | null;
  status?: RegistrationStatus;
}

/** Contact message record from the database */
export interface ContactMessageRow {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: MessageStatus;
}

/** Data required to insert a contact message record */
export interface ContactMessageInsert {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  status?: MessageStatus;
}

/** Table names for type-safe queries */
export const TABLES = {
  REGISTRATIONS: "registrations" as const,
  CONTACT_MESSAGES: "contact_messages" as const,
};