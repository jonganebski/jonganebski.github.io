/**
 * @file
 * This file handles environment variables.
 */

/**
 * @name VITE_SUPABASE_URL
 * @link https://supabase.com
 */
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;

/**
 * @name VITE_SUPABASE_ANON_KEY
 * @link https://supabase.com
 */
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

/**
 * @name VITE_MAPBOX_ACCESS_TOKEN
 * @link https://www.mapbox.com
 */
export const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

/**
 * @name VITE_SENTRY_DSN
 * @link https://sentry.io
 */
export const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string;
