import { Outlet } from 'react-router-dom';
import { useLocale } from '@tanlabs/providers';

import { DashboardShell } from '@/features/dashboard';
import { getAdminLang } from '@/shared/i18n';

export function DashboardLayout() {
  const { locale } = useLocale();
  const lang = getAdminLang(locale);

  return (
    <DashboardShell shell={lang.shell} lang={lang} initialAccessToken={null}>
      <Outlet />
    </DashboardShell>
  );
}
