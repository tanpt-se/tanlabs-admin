import type { LoginResponse } from '@tanlabs/contracts';
import type { AuthAppConfig } from '@tanlabs/web-common/auth/auth-app-config';

import { ADMIN_AUTH_COOKIE, ADMIN_CSRF_COOKIE, ADMIN_REFRESH_COOKIE } from './config/auth-cookies';

export const ADMIN_LOGIN_RATE_LIMIT_COOKIE = 'admin_auth_login_rate_limited_until';
export const ADMIN_LOCALE_COOKIE = 'admin_authlab_locale';
export const ADMIN_THEME_COOKIE = 'admin_authlab_theme';
export const LOGIN_NEXT_QUERY_PARAM = 'next';

export const ADMIN_PUBLIC_ROUTES = {
  login: '/login',
  forgotPassword: '/forgot-password',
} as const;

export const ADMIN_AUTH_ROUTES = {
  dashboard: '/',
  myAccount: '/my-account',
} as const;

export const DEFAULT_AUTHENTICATED_REDIRECT = ADMIN_AUTH_ROUTES.dashboard;

export const PUBLIC_ENTRY_PATHS = [
  ADMIN_PUBLIC_ROUTES.login,
  ADMIN_PUBLIC_ROUTES.forgotPassword,
] as const;

export const AUTHENTICATED_ENTRY_PATHS = [
  ADMIN_AUTH_ROUTES.dashboard,
  ADMIN_AUTH_ROUTES.myAccount,
] as const;

const publicEntrySet = new Set<string>(PUBLIC_ENTRY_PATHS);

export const isPublicEntryPath = (pathname: string): boolean => publicEntrySet.has(pathname);
export const isAuthenticatedEntryPath = (pathname: string): boolean =>
  AUTHENTICATED_ENTRY_PATHS.some(
    (entryPath) => pathname === entryPath || pathname.startsWith(`${entryPath}/`),
  );

export const adminAuthConfig: AuthAppConfig = {
  audience: 'admin',
  routes: {
    login: ADMIN_PUBLIC_ROUTES.login,
    defaultAuthenticatedRedirect: DEFAULT_AUTHENTICATED_REDIRECT,
    loginNextQueryParam: LOGIN_NEXT_QUERY_PARAM,
    isPublicEntryPath,
    isAuthenticatedEntryPath,
  },
  cookies: {
    auth: ADMIN_AUTH_COOKIE,
    refresh: ADMIN_REFRESH_COOKIE,
    csrf: ADMIN_CSRF_COOKIE,
    loginRateLimit: ADMIN_LOGIN_RATE_LIMIT_COOKIE,
  },
  sessionEnded: {
    normalizeReason: () => ({ reason: 'session-revoked' }),
  },
};

export type AdminSessionUser = LoginResponse['user'];
