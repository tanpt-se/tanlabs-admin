'use client';

import { SharedLoginForm, type SharedLoginFormCopy } from '@tanlabs/components/shared-login-form';
import { startSocialAuth } from '@tanlabs/web-common/auth/social-auth';

import { getPublicAuthRuntime } from '@/shared/auth/public-auth-runtime';
import type { AdminLang } from '@/shared/i18n';
import { ADMIN_PUBLIC_ROUTES } from '@/shared/routing';

import { useLoginForm } from '../hooks/use-login-form';

export function LoginForm({
  lang,
  nextPath,
  notice,
}: {
  lang: AdminLang['login'];
  nextPath?: string;
  notice?: { title: string; description: string };
}) {
  const {
    email,
    error,
    loading,
    password,
    pendingTwoFactor,
    setEmail,
    setPassword,
    setTwoFactorCode,
    submit,
    twoFactorCode,
  } = useLoginForm(lang, nextPath);
  const googleAuthEnabled = getPublicAuthRuntime().getGoogleOAuthEnabled();
  const copy: SharedLoginFormCopy = {
    title: lang.title,
    subtitle: lang.subtitle,
    emailLabel: lang.emailLabel,
    emailPlaceholder: lang.emailPlaceholder,
    passwordLabel: lang.passwordLabel,
    passwordPlaceholder: lang.passwordPlaceholder,
    twoFactorStepTitle: lang.twoFactorStepTitle,
    twoFactorStepDescription: lang.twoFactorStepDescription,
    otpEmailLabel: lang.otpEmailLabel,
    otpAuthenticatorLabel: lang.otpAuthenticatorLabel,
    otpEmailHint: lang.otpEmailHint,
    otpAuthenticatorHint: lang.otpAuthenticatorHint,
    otpPlaceholder: lang.twoFactorCodePlaceholder,
    submitDefault: lang.signIn,
    submitRateLimited: lang.signIn,
    submitTwoFactor: lang.verifyAndSignIn,
    submitLoading: lang.authenticating,
    orText: lang.orText,
    googleSignIn: lang.googleSignIn,
    forgotPassword: lang.forgotPassword,
  };

  return (
    <SharedLoginForm
      copy={copy}
      email={email}
      error={error}
      googleAuthEnabled={googleAuthEnabled}
      loading={loading}
      notice={notice}
      onEmailChange={setEmail}
      onGoogleSignIn={() => startSocialAuth('admin', 'google', nextPath, 'login', 'admin')}
      onPasswordChange={setPassword}
      onSubmit={submit}
      onTwoFactorCodeChange={setTwoFactorCode}
      password={password}
      pendingTwoFactorMethod={pendingTwoFactor?.method}
      twoFactorCode={twoFactorCode}
      forgotPasswordHref={ADMIN_PUBLIC_ROUTES.forgotPassword}
    />
  );
}
