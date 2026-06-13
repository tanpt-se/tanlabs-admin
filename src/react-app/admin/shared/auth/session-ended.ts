import { deleteClientCookie } from '@tanlabs/platform';

import { adminAuthConfig } from '@/auth-config';
import { clearSession } from '@/shared/auth';

const defaultNormalizeReason = (incomingReason: string | null) => ({
  reason: incomingReason === 'session-ended' ? 'session-ended' : 'session-revoked',
});

export function resolveSessionEndedLoginUrl(requestUrl: string): URL {
  const incomingReason = new URL(requestUrl).searchParams.get('reason');
  const resolved = (adminAuthConfig.sessionEnded?.normalizeReason ?? defaultNormalizeReason)(
    incomingReason,
  );
  const redirectUrl = new URL(adminAuthConfig.routes.login, requestUrl);
  redirectUrl.searchParams.set('reason', resolved.reason);
  return redirectUrl;
}

export function clearAuthCookies(): void {
  const cookieNames = [
    adminAuthConfig.cookies.auth,
    adminAuthConfig.cookies.refresh,
    adminAuthConfig.cookies.csrf,
    ...(adminAuthConfig.sessionEnded?.extraClearCookies ?? []),
  ];

  for (const cookieName of cookieNames) {
    deleteClientCookie(cookieName);
  }
}

export function handleSessionEnded(): string {
  clearAuthCookies();
  clearSession();
  const url = resolveSessionEndedLoginUrl(window.location.href);
  return `${url.pathname}${url.search}`;
}
