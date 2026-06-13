import { RouterProvider } from 'react-router-dom';
import { ThemeScript } from '@tanlabs/components';

import { ADMIN_THEME_COOKIE } from '@/auth-config';

import { router } from './app/router';

export function App() {
  return (
    <>
      <ThemeScript themeCookieName={ADMIN_THEME_COOKIE} />
      <RouterProvider router={router} />
    </>
  );
}
