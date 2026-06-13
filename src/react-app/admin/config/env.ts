import { type PublicAuthClientConfig, readPublicAuthClientConfig } from '@tanlabs/config';

import { CSRF_COOKIE } from '@/shared/auth';

export type AdminConfig = PublicAuthClientConfig;

export function getAdminConfig(): AdminConfig {
  return readPublicAuthClientConfig(CSRF_COOKIE);
}
