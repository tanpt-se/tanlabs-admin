# TanLabs Admin

Admin console for TanLabs — React SPA on Cloudflare Workers with auth UI ported from [auth-lab](https://github.com/tanpt-se/auth-lab.git), backed by [tanlabs-api](https://github.com/tanpt-se/tanlabs-api.git).

## Prerequisites

- Node.js 20+
- pnpm
- [tanlabs-api](https://github.com/tanpt-se/tanlabs-api) running locally

## Development

Start the API first (port **8787**):

```bash
cd ../tanlabs-api
pnpm install
pnpm dev
```

Then start the admin app (port **5102**):

```bash
pnpm install
cp .dev.vars.example .dev.vars   # optional — default API_ORIGIN is localhost:8787
pnpm dev
```

Open [http://localhost:5102](http://localhost:5102).

### Seed credentials

| Email | Password | Role |
|-------|----------|------|
| `admin@example.com` | `Password123!` | admin |
| `user@example.com` | `Password123!` | user (rejected on admin login) |

## Architecture

- **Frontend:** Vite + React 19 SPA
- **Worker:** Hono proxy — browser calls `/api/*`, Worker forwards to `tanlabs-api`
- **Auth:** JWT access token (in-memory) + HttpOnly refresh cookie (`admin_refresh_token`)

All API traffic stays same-origin via the Worker proxy — no direct browser calls to `:8787`.

## Routes

| Path | Description |
|------|-------------|
| `/login` | Admin login (+ 2FA, Google OAuth when enabled) |
| `/forgot-password` | Password recovery |
| `/` | Dashboard |
| `/my-account` | Profile, 2FA, Google link, session revoke |
| `/auth/session-ended` | Clears cookies after forced logout |

## Environment

### Worker (`.dev.vars`)

| Variable | Default | Description |
|----------|---------|-------------|
| `API_ORIGIN` | `http://localhost:8787` | Upstream tanlabs-api URL |

Production: set in `wrangler.json` → `env.production.vars`.

### Frontend (`.env` — optional)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE` | `/api` | API base path (Worker proxy) |
| `VITE_AUTH_GOOGLE_ENABLED` | `false` | Show Google sign-in button |
| `VITE_AUTH_CSRF_PROTECTION_ENABLED` | `false` | Send CSRF header on logout |

## Google OAuth

When enabling Google login:

1. Set `VITE_AUTH_GOOGLE_ENABLED=true` in admin `.env`
2. Configure tanlabs-api secrets:
   - `GOOGLE_OAUTH_CLIENT_ID`
   - `GOOGLE_OAUTH_CLIENT_SECRET`
   - `GOOGLE_OAUTH_REDIRECT_URI=http://localhost:5102/api/auth/oauth/google/callback`

Production redirect URI: `https://tanlabs-admin.nikinpham.com/api/auth/oauth/google/callback`

## Deploy

```bash
pnpm build
pnpm deploy
```

## i18n

Supported locales: English, Vietnamese, Japanese, Korean — switch via the language menu on auth pages and dashboard.
