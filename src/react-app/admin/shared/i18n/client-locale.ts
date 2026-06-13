import { getClientCookie, isLocale, type Locale } from '@tanlabs/platform';

import { ADMIN_LOCALE_COOKIE, ADMIN_THEME_COOKIE } from '@/auth-config';

export function getClientLocale(): Locale {
  const cookieValue = getClientCookie(ADMIN_LOCALE_COOKIE);
  return cookieValue && isLocale(cookieValue) ? cookieValue : 'en';
}

export function getClientTheme(): 'light' | 'dark' | 'system' {
  const cookieValue = getClientCookie(ADMIN_THEME_COOKIE);
  if (cookieValue === 'light' || cookieValue === 'dark' || cookieValue === 'system') {
    return cookieValue;
  }
  return 'system';
}
