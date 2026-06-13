export const ADMIN_API_ROUTES = {
  auth: {
    login: '/auth/login',
    forgotPassword: '/auth/forgot-password',
  },
  account: {
    me: '/users/me',
  },
} as const;

export { withQuery } from '@tanlabs/contracts';
