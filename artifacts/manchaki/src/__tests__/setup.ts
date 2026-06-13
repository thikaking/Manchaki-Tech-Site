/**
 * Test setup for Manchaki Technical Training Institute and Driving School
 * Integration tests for Supabase backend.
 */

// Mock environment variables for testing
process.env.VITE_SUPABASE_URL = "https://mock-project.supabase.co";
process.env.VITE_SUPABASE_ANON_KEY = "mock-anon-key-for-testing";

// Suppress console errors during tests
global.console.error = jest.fn();