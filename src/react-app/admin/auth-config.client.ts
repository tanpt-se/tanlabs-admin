import { isAdminAudience } from '@tanlabs/contracts';
import {
  createAccessSessionHelpers,
  createRouteGuards,
  createSessionStore,
} from '@tanlabs/platform';

import {
  AUTHENTICATED_ENTRY_PATHS,
  type AdminSessionUser,
  DEFAULT_AUTHENTICATED_REDIRECT,
  PUBLIC_ENTRY_PATHS,
  adminAuthConfig,
} from './auth-config';

const adminSessionStore = createSessionStore<AdminSessionUser>({
  authCookie: adminAuthConfig.cookies.auth,
});

const adminSessionHelpers = createAccessSessionHelpers<AdminSessionUser>(
  adminSessionStore.getToken,
  'admin',
);

const adminSession = {
  ...adminSessionStore,
  ...adminSessionHelpers,
  hasAuthCookie: (cookieName = adminAuthConfig.cookies.auth) =>
    adminSessionHelpers.hasAuthCookie(cookieName),
};

export const adminRouteGuards = createRouteGuards({
  publicEntryPaths: PUBLIC_ENTRY_PATHS,
  authenticatedEntryPaths: AUTHENTICATED_ENTRY_PATHS,
  defaultRedirect: DEFAULT_AUTHENTICATED_REDIRECT,
});

export const adminAuthClient = {
  config: adminAuthConfig,
  session: adminSession,
  hasRequiredAudience: () => {
    const payload = adminSession.getTokenPayload();
    return isAdminAudience({ role: payload?.role, permissions: payload?.permissions });
  },
  hasAuthCookie: () => adminSession.hasAuthCookie(adminAuthConfig.cookies.auth),
};
