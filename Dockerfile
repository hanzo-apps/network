# hanzo.network — a Vite SPA served by hanzoai/static, the house static server (a
# Go binary on scratch). No GitHub Pages, no Cloudflare Pages: the site is an
# image the operator runs behind hanzoai/ingress like every other Hanzo surface.

FROM node:22 AS build
WORKDIR /src
# corepack reads packageManager from package.json; node:22 matches .nvmrc.
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# hanzoai/static defaults to -port 3000 -root /public. -spa is required: this is a
# two-page BrowserRouter, so a deep link such as /pricing must reach index.html for
# the router to resolve it (any other path hands off to hanzo.ai from the client).
# Without it every deep link 404s.
FROM ghcr.io/hanzoai/static:v0.5.1
COPY --from=build /src/dist /public
ENTRYPOINT ["/static", "-spa"]
