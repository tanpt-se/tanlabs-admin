import { useLocale } from '@tanlabs/providers';

import { DashboardHome } from '@/features/dashboard';
import { getAdminLang } from '@/shared/i18n';

export function DashboardPage() {
  const { locale } = useLocale();
  const lang = getAdminLang(locale);

  return <DashboardHome lang={lang.dashboard} />;
}
