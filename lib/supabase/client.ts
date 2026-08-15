import { createBrowserClient } from '@supabase/ssr'

// Falls back to placeholder values so this never throws during the
// build-time SSR pass of pages that construct it at render time (e.g. if
// the Preview environment hasn't been given real Supabase credentials
// yet). Auth calls will simply fail at runtime until real values are set.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
  )
}
