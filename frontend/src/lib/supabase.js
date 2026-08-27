import { createClient } from '@supabase/supabase-js';

// Supabase Environment Credentials (can be configured in .env as VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://annsetu-realtime.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubnNldHUtcmVhbHRpbWUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwMDA0ODAwMCwiZXhwIjoyMDE1NjI0MDAwfQ.demo_key_annsetu_realtime_connection';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

export const isSupabaseConfigured = () => {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
};

/**
 * SQL Schema for Supabase Setup:
 * 
 * CREATE TABLE donations (
 *   id TEXT PRIMARY KEY,
 *   donorName TEXT NOT NULL,
 *   donorType TEXT NOT NULL,
 *   phone TEXT NOT NULL,
 *   email TEXT NOT NULL,
 *   pickupAddress TEXT NOT NULL,
 *   city TEXT NOT NULL,
 *   pincode TEXT NOT NULL,
 *   foodName TEXT NOT NULL,
 *   foodCategory TEXT NOT NULL,
 *   foodQuality TEXT NOT NULL,
 *   prepDate TEXT NOT NULL,
 *   prepTime TEXT NOT NULL,
 *   quantity TEXT NOT NULL,
 *   servingCapacity INT NOT NULL,
 *   ngoId TEXT NOT NULL,
 *   ngoName TEXT NOT NULL,
 *   status TEXT NOT NULL,
 *   imageUrl TEXT,
 *   createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * 
 * ALTER PUBLICATION supabase_realtime ADD TABLE donations;
 */
