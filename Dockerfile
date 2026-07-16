FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.d/40-inject-env.sh
# Strip any CRLF (Windows checkout) so the /bin/sh shebang is valid in-container
# — otherwise nginx's entrypoint launcher fails with "not found" (exit 127).
RUN sed -i 's/\r$//' /docker-entrypoint.d/40-inject-env.sh && chmod +x /docker-entrypoint.d/40-inject-env.sh
EXPOSE 80
