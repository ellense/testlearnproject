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

shift + alt + F - форматирование





# для Ники:

создаешь в папке client файл .env
пишешь в нем :
    VITE_BASE_URL='http://127.0.0.1:8000'
    VITE_REFRESH_URL: "api/token/refresh/"
    VITE_LOGIN_URL: "api/token/"
    VITE_ACCESS_KEY: "accessToken"
    VITE_REFRESH_KEY: "refreshToken"
    VITE_TIMEOUT: 1500
в терминале пишешь:
cd client
yarn install
npm run dev
