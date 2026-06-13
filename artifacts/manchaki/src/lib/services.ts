/**
 * Supabase Service Layer for Manchaki Driving School
 * 
 * Provides type-safe data operations for:
 * - Registration form submissions
 * - Contact form submissions
 * 
 * All operations use RLS-compatible anonymous access (insert only).
 * Admin operations (read, update, delete) require authentication.
 */

import { supabase } from "./supabase";
import { logError } from "./errors";
import type { RegistrationInsert, ContactMessageInsert } from "./database.types";

// =====================================================
// REGISTRATION SERVICE
// =====================================================

/**
 * Submit a student registration form to Supabase.
 * 
 * @param registration - The registration data to insert
 * @returns The created registration record
 * @throws If validation fails or database operation fails
 */
export async function submitRegistration(registration: RegistrationInsert) {
  const { data, error } = await supabase
    .from("registrations")
    .insert({
      full_name: registration.full_name,
      national_id: registration.national_id,
      phone: registration.phone,
      email: registration.email || null,
      preferred_course: registration.preferred_course,
      preferred_branch: registration.preferred_branch,
      preferred_start_date: registration.preferred_start_date,
      message: registration.message || null,
      status: "pending",
    })
    .select("id, created_at, status")
    .single();

  if (error) {
    logError(error, "submitRegistration");
    throw error;
  }

  return data;
}

/**
 * Fetch registrations (admin only - requires authentication).
 */
export async function getRegistrations() {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    logError(error, "getRegistrations");
    throw error;
  }

  return data;
}

/**
 * Update registration status (admin only).
 */
export async function updateRegistrationStatus(
  id: string,
  status: "pending" | "approved" | "rejected" | "cancelled"
) {
  const { data, error } = await supabase
    .from("registrations")
    .update({ status })
    .eq("id", id)
    .select("id, status")
    .single();

  if (error) {
    logError(error, "updateRegistrationStatus");
    throw error;
  }

  return data;
}

// =====================================================
// CONTACT MESSAGE SERVICE
// =====================================================

/**
 * Submit a contact form message to Supabase.
 * 
 * @param message - The contact message data to insert
 * @returns The created message record
 * @throws If validation fails or database operation fails
 */
export async function submitContactMessage(message: ContactMessageInsert) {
  const { data, error } = await supabase
    .from("contact_messages")
    .insert({
      name: message.name,
      email: message.email,
      phone: message.phone || null,
      message: message.message,
      status: "new",
    })
    .select("id, created_at, status")
    .single();

  if (error) {
    logError(error, "submitContactMessage");
    throw error;
  }

  return data;
}

/**
 * Fetch contact messages (admin only - requires authentication).
 */
export async function getContactMessages() {
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    logError(error, "getContactMessages");
    throw error;
  }

  return data;
}

/**
 * Update contact message status (admin only).
 */
export async function updateMessageStatus(
  id: string,
  status: "new" | "read" | "archived"
) {
  const { data, error } = await supabase
    .from("contact_messages")
    .update({ status })
    .eq("id", id)
    .select("id, status")
    .single();

  if (error) {
    logError(error, "updateMessageStatus");
    throw error;
  }

  return data;
}