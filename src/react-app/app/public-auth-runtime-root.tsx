'use client';

import { createPublicAuthRequests } from '@tanlabs/web-common/auth/public-auth-requests';

import { ADMIN_LOGIN_RATE_LIMIT_COOKIE, ADMIN_PUBLIC_ROUTES } from '@/auth-config';
import { getAdminConfig } from '@/config/env';
import { ADMIN_API_ROUTES } from '@/shared/api';
import { clearSession, saveSession } from '@/shared/auth';
import { configurePublicAuthRuntime } from '@/shared/auth/public-auth-runtime';
import { api } from '@/shared/http/client';

let configured = false;

function ensurePublicAuthRuntimeConfigured() {
  if (configured) {
    return;
  }

  const cfg = getAdminConfig();
  const login = ADMIN_API_ROUTES.auth.login;
  configurePublicAuthRuntime({
    routes: {
      login: ADMIN_PUBLIC_ROUTES.login,
      register: ADMIN_PUBLIC_ROUTES.login,
      verifyEmail: ADMIN_PUBLIC_ROUTES.login,
      accountSetup: ADMIN_PUBLIC_ROUTES.login,
      forgotPassword: ADMIN_PUBLIC_ROUTES.forgotPassword,
      resetPassword: ADMIN_PUBLIC_ROUTES.login,
    },
    requests: createPublicAuthRequests({
      post: (path, body) => api.post(path, body),
      paths: {
        login,
        forgotPassword: ADMIN_API_ROUTES.auth.forgotPassword,
        resetPassword: login,
        register: login,
        verifyEmail: login,
        resendEmailVerification: login,
        accountSetup: login,
      },
    }),
    getApiBaseUrl: () => cfg.apiBaseUrl,
    getTurnstileSiteKey: () => cfg.turnstile.siteKey,
    getGoogleOAuthEnabled: () => cfg.oauth.googleEnabled,
    apiPost: (path, body) => api.post(path, body),
    usersSocialLinkStart: (provider) => `/users/me/social-link/${provider}`,
    loginRateLimitCookieName: ADMIN_LOGIN_RATE_LIMIT_COOKIE,
    clearClientSession: () => {
      void clearSession();
    },
    saveClientSession: saveSession,
  });
  configured = true;
}

export function PublicAuthRuntimeRoot() {
  ensurePublicAuthRuntimeConfigured();

  return null;
}
