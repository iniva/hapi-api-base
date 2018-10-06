# STAGE: BUILDER - Pre-release stage
FROM node:carbon-alpine as builder

COPY . /app
WORKDIR /app

RUN set -x; \
    yarn install && \
    yarn build

CMD ["node"]

# STAGE: TESTING - Assertion step
FROM builder as tester

RUN set -x; \
    yarn test

# STAGE: RELEASE
FROM node:carbon-alpine as release

ENV SERVER_PORT=8091
ENV YARN_CACHE_FOLDER="/app/.cache/yarn"

COPY --from=builder /app /app

EXPOSE $SERVER_PORT
WORKDIR /app

CMD ["yarn", "start:dist"]
