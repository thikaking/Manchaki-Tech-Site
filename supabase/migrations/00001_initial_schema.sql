-- =====================================================
-- Manchaki Driving School - Initial Database Schema
-- =====================================================
-- This migration creates the foundational tables:
--   1. registrations - Student enrollment forms
--   2. contact_messages - Website contact form submissions
-- =====================================================

-- =====================================================
-- 1. REGISTRATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Personal Information
  full_name TEXT NOT NULL CHECK (char_length(full_name) >= 3),
  national_id TEXT NOT NULL CHECK (char_length(national_id) >= 7),
  phone TEXT NOT NULL CHECK (char_length(phone) >= 9),
  email TEXT CHECK (email IS NULL OR email = '' OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),

  -- Enrollment Details
  preferred_course TEXT NOT NULL,
  preferred_branch TEXT NOT NULL,
  preferred_start_date TEXT NOT NULL,

  -- Optional Notes
  message TEXT DEFAULT NULL,

  -- Status Tracking
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled'))
);

-- Index for admin queries
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_registrations_branch ON public.registrations(preferred_branch);

-- =====================================================
-- 2. CONTACT MESSAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Sender Information
  name TEXT NOT NULL CHECK (char_length(name) >= 2),
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone TEXT DEFAULT NULL,

  -- Message Content
  message TEXT NOT NULL CHECK (char_length(message) >= 10),

  -- Status Tracking
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived'))
);

-- Index for admin queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);

-- =====================================================
-- 3. ENABLE ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first to allow re-runs
DROP POLICY IF EXISTS "Public can create registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can view registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can update registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admins can delete registrations" ON public.registrations;

DROP POLICY IF EXISTS "Public can create contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can update contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can delete contact messages" ON public.contact_messages;

-- =====================================================
-- 4. RLS POLICIES - REGISTRATIONS
-- =====================================================

-- Public users can INSERT (submit) registration requests
CREATE POLICY "Public can create registrations"
  ON public.registrations
  FOR INSERT
  TO anon, public
  WITH CHECK (true);

-- Only authenticated admins can SELECT registrations
CREATE POLICY "Admins can view registrations"
  ON public.registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated admins can UPDATE registration status
CREATE POLICY "Admins can update registrations"
  ON public.registrations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated admins can DELETE registrations
CREATE POLICY "Admins can delete registrations"
  ON public.registrations
  FOR DELETE
  TO authenticated
  USING (true);

-- =====================================================
-- 5. RLS POLICIES - CONTACT MESSAGES
-- =====================================================

-- Public users can INSERT (submit) contact messages
CREATE POLICY "Public can create contact messages"
  ON public.contact_messages
  FOR INSERT
  TO anon, public
  WITH CHECK (true);

-- Only authenticated admins can SELECT contact messages
CREATE POLICY "Admins can view contact messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated admins can UPDATE message status
CREATE POLICY "Admins can update contact messages"
  ON public.contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated admins can DELETE contact messages
CREATE POLICY "Admins can delete contact messages"
  ON public.contact_messages
  FOR DELETE
  TO authenticated
  USING (true);