'use client';

import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { isAdminAudience } from '@tanlabs/contracts';
import type { LoginRequest, LoginResponse } from '@tanlabs/contracts';
import {
  type PendingTwoFactorState,
  createPrimaryLoginSchema,
  createTwoFactorLoginSchema,
  resolveLoginRequestError,
  validateLoginSubmission,
} from '@tanlabs/platform';

import { ADMIN_API_ROUTES } from '@/shared/api';
import { saveSession } from '@/shared/auth';
import { api, logoutSession } from '@/shared/http/client';
import type { AdminLang } from '@/shared/i18n';
import { resolveAuthenticatedRedirect } from '@/shared/routing';

function validateAdminAudience(
  response: LoginResponse,
  invalidAudienceMessage: string,
): string | null {
  const isExpectedAudience = isAdminAudience({
    role: response.user.role,
    permissions: response.user.permissions,
  });

  if (isExpectedAudience) {
    return null;
  }

  void logoutSession();
  return invalidAudienceMessage;
}

export type { PendingTwoFactorState };

export function useLoginForm(lang: AdminLang['login'], nextPath?: string) {
  const navigate = useNavigate();
  const resolvedNextPath = resolveAuthenticatedRedirect(nextPath);
  const primarySchema = useMemo(() => createPrimaryLoginSchema(lang), [lang]);
  const twoFactorSchema = useMemo(() => createTwoFactorLoginSchema(lang), [lang]);
  const [email, setEmailState] = useState('');
  const [password, setPasswordState] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [pendingTwoFactor, setPendingTwoFactor] = useState<PendingTwoFactorState | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const clearTwoFactorState = () => {
    setPendingTwoFactor(null);
    setTwoFactorCode('');
  };

  const setEmail = (value: string) => {
    if (pendingTwoFactor && value !== email) {
      clearTwoFactorState();
    }
    setEmailState(value);
  };

  const setPassword = (value: string) => {
    if (pendingTwoFactor && value !== password) {
      clearTwoFactorState();
    }
    setPasswordState(value);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    const validatedSubmission = validateLoginSubmission({
      primarySchema,
      twoFactorSchema,
      values: { email, password, twoFactorCode },
      pendingTwoFactor,
      fallbackMessage: lang.loginFailed,
    });
    if (!validatedSubmission.success) {
      setError(validatedSubmission.error);
      return;
    }

    setLoading(true);
    try {
      const body: LoginRequest = {
        email: validatedSubmission.email,
        password: validatedSubmission.password,
        twoFactorCode: validatedSubmission.twoFactorCode,
        twoFactorMethod: pendingTwoFactor?.method,
        twoFactorChallengeId: pendingTwoFactor?.challengeId,
      };
      const response = await api.post<LoginResponse>(ADMIN_API_ROUTES.auth.login, body);
      const audienceError = validateAdminAudience(response, lang.nonAdminError);
      if (audienceError) {
        setError(audienceError);
        return;
      }

      clearTwoFactorState();
      saveSession(response);
      navigate(resolvedNextPath, { replace: true });
    } catch (requestError) {
      const resolvedError = resolveLoginRequestError({
        error: requestError,
        authErrors: lang.authErrors,
        fallbackMessage: lang.loginFailed,
      });
      if (resolvedError.pendingTwoFactor) {
        setPendingTwoFactor(resolvedError.pendingTwoFactor);
        setError('');
      } else {
        setError(resolvedError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    error,
    loading,
    password,
    pendingTwoFactor,
    setEmail,
    setError,
    setPassword,
    setTwoFactorCode,
    submit,
    twoFactorCode,
  };
}
