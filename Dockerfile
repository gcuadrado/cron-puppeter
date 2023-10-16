FROM node:18-alpine AS builder
WORKDIR "/app"
COPY . .
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
RUN npm ci
RUN npm run build
RUN npm prune --production
FROM node:18-alpine AS production
WORKDIR "/app"
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
# RUN apk add chromium



# # If running Docker >= 1.13.0 use docker run's --init arg to reap zombie processes, otherwise
# # uncomment the following lines to have `dumb-init` as PID 1
# # ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_x86_64 /usr/local/bin/dumb-init
# # RUN chmod +x /usr/local/bin/dumb-init
# # ENTRYPOINT ["dumb-init", "--"]

# # Uncomment to skip the chromium download when installing puppeteer. If you do,
# # you'll need to launch puppeteer with:
# #     browser.launch({executablePath: 'google-chrome-stable'})
# # ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# # Install puppeteer so it's available in the container.
# RUN npm init -y &&  \
#     npm i puppeteer 

CMD [ "sh", "-c", "npm run start:prod"]

