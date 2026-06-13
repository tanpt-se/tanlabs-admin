/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
  readonly VITE_AUTH_GOOGLE_ENABLED?: string;
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  readonly VITE_AUTH_CSRF_PROTECTION_ENABLED?: string;
  readonly VITE_AUTH_CSRF_COOKIE_NAME?: string;
  readonly VITE_SESSION_WATCHDOG_INTERVAL_MS?: string;
  readonly VITE_MAX_ACTIVE_SESSIONS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
