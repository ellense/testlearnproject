# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

<!-- API_BASE_URL = "http://192.168.6.168:8001" -->
<!-- VITE_BASE_URL='http://10.0.1.149:8001'  -- укажи свой путь до бека -->
# VITE_REFRESH_URL: "api/token/refresh/"  -- укажи свой путь до refresh API
# VITE_LOGIN_URL: "api/token/"            -- укажи свой путь до API авторизации
# VITE_ACCESS_KEY: "accessToken"          -- измени ключ для хранения в LocalStorage (если нужно)
# VITE_REFRESH_KEY: "refreshToken"        -- измени ключ для хранения в LocalStorage (если нужно)
# todos
# http://192.168.6.168:8001/api/entitieslist/?format=json
# https://jsonplaceholder.typicode.com/
# http://192.168.6.168:8001/api/v1/auth/users/?format=json
# http://192.168.6.168:8001/auth/token/login
<!-- python manage.py migrate -->

вставить в .env
VITE_BASE_URL='http://127.0.0.1:8001'
VITE_REFRESH_URL: "api/token/refresh/"
VITE_LOGIN_URL: "api/token/"
VITE_ACCESS_KEY: "accessToken"
VITE_REFRESH_KEY: "refreshToken"
VITE_TIMEOUT: 1500
# http://127.0.0.1:8001 на работе со своего
# http://192.168.6.168:8001 на работе с вероникиного
# http://127.0.0.1:8000 дома
