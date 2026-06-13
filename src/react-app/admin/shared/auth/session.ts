import type { LoginResponse } from '@tanlabs/contracts';
import type { TokenPayload } from '@tanlabs/types';

import { adminAuthClient } from '@/auth-config.client';

import {
  ADMIN_AUTH_COOKIE,
  ADMIN_CSRF_COOKIE,
  ADMIN_REFRESH_COOKIE,
} from '../../config/auth-cookies';

export const AUTH_COOKIE = ADMIN_AUTH_COOKIE;
export const ACCESS_TOKEN_COOKIE = 'admin_access_token';
export const REFRESH_COOKIE = ADMIN_REFRESH_COOKIE;
export const CSRF_COOKIE = ADMIN_CSRF_COOKIE;

export type { TokenPayload };
export type SessionUser = LoginResponse['user'];

const authSession = adminAuthClient.session;

export const { getToken, saveRefresh, hydrateSession, saveSession, clearSession } = authSession;
export const { parseAccessToken, getTokenPayload, getUser, getPermissions, hasPermission } =
  authSession;

export const hasAuthCookie = adminAuthClient.hasAuthCookie;
export const hasAdminAudience = adminAuthClient.hasRequiredAudience;
