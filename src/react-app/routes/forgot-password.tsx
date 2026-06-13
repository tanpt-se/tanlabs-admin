import { ForgotPasswordForm } from '@/features/auth';
import { AuthLayout } from '@/features/auth';
import { useLocale } from '@tanlabs/providers';

import { getAdminLang } from '@/shared/i18n';
import { ADMIN_PUBLIC_ROUTES } from '@/shared/routing';

export function ForgotPasswordPage() {
  const { locale } = useLocale();
  const lang = getAdminLang(locale);

  return (
    <AuthLayout app="admin">
      <ForgotPasswordForm
        app="admin"
        backToLoginHref={ADMIN_PUBLIC_ROUTES.login}
        lang={lang.forgotPassword}
      />
    </AuthLayout>
  );
}
