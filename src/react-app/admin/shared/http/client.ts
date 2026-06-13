import { createBrowserApiClient, createCsrfHeadersBuilder } from '@tanlabs/platform';

import { getAdminConfig } from '@/config/env';
import { clearSession, getToken, saveRefresh } from '@/shared/auth';
import { SESSION_TERMINATED_ROUTE } from '@/shared/routing';

const csrfProtectedPaths = new Set(['/auth/logout', '/auth/2fa/disable']);

export const { api, logoutSession, refreshSession } = createBrowserApiClient({
  apiBaseUrl: getAdminConfig().apiBaseUrl,
  buildDefaultHeaders: () => ({ 'x-auth-client': 'admin' }),
  buildSensitiveActionHeaders: createCsrfHeadersBuilder(getAdminConfig, csrfProtectedPaths),
  clearSession,
  getToken,
  saveRefresh,
  redirectToLogin: () => {
    if (typeof window !== 'undefined') {
      window.location.href = SESSION_TERMINATED_ROUTE;
    }
  },
});
