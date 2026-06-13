import { DashboardOverview } from '@tanlabs/components';

import type { AdminLang } from '@/shared/i18n';

export function DashboardHome({ lang }: { lang: AdminLang['dashboard'] }) {
  return (
    <DashboardOverview stats={[]} title={lang.title} description={lang.description} actions={[]} />
  );
}
