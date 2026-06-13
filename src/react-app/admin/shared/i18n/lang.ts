import { type DashboardHeaderText, type Locale, buildDashboardHeaderText } from '@tanlabs/platform';
import type { DeepWiden } from '@tanlabs/types';

import { ADMIN_AUTH_ROUTES } from '@/shared/routing';

import { enAdminLang } from './messages/en';
import { jaAdminLang } from './messages/ja';
import { koAdminLang } from './messages/ko';
import { viAdminLang } from './messages/vi';

const adminLangByLocale = {
  en: enAdminLang,
  vi: viAdminLang,
  ja: jaAdminLang,
  ko: koAdminLang,
} as const;

export type AdminLang = DeepWiden<typeof enAdminLang>;
export type { DashboardHeaderText };
export { buildDashboardHeaderText };

export function getAdminLang(locale: Locale): AdminLang {
  return adminLangByLocale[locale] ?? enAdminLang;
}

export function resolveDashboardHeaderText(pathname: string, lang: AdminLang): DashboardHeaderText {
  if (pathname === ADMIN_AUTH_ROUTES.myAccount) {
    return {
      breadcrumb: lang.shell.nav.myAccount,
      title: lang.myAccount.title,
      description: lang.myAccount.description,
      fallbackUser: lang.shell.fallbackUser,
      logout: lang.shell.logout,
    };
  }

  return buildDashboardHeaderText(lang);
}
