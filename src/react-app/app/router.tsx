import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ADMIN_AUTH_ROUTES, ADMIN_PUBLIC_ROUTES, SESSION_TERMINATED_ROUTE } from '@/shared/routing';

import { ProtectedRoute, PublicRoute } from './route-guards';
import { RootLayout } from './root-layout';
import { LoginPage } from '../routes/login';
import { ForgotPasswordPage } from '../routes/forgot-password';
import { SessionEndedPage } from '../routes/session-ended';
import { DashboardLayout } from '../routes/dashboard/layout';
import { DashboardPage } from '../routes/dashboard/index';
import { MyAccountRoute } from '../routes/dashboard/my-account';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: ADMIN_PUBLIC_ROUTES.login,
        element: <PublicRoute />,
        children: [{ index: true, element: <LoginPage /> }],
      },
      {
        path: ADMIN_PUBLIC_ROUTES.forgotPassword,
        element: <PublicRoute />,
        children: [{ index: true, element: <ForgotPasswordPage /> }],
      },
      {
        path: SESSION_TERMINATED_ROUTE,
        element: <SessionEndedPage />,
      },
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { index: true, element: <DashboardPage /> },
              { path: 'my-account', element: <MyAccountRoute /> },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to={ADMIN_AUTH_ROUTES.dashboard} replace />,
      },
    ],
  },
]);
