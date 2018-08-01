# STAGE: LOCAL - Development Environment
FROM node:carbon-alpine as local

ARG UID=1000

COPY scripts/ /

# Verify if provided UID exists
# Otherwise create a new non-root user to avoid
# file permission conflicts with host machine
# This is intended only for local development
RUN ./local.sh ${UID}

# The source code is mounted on the docker-compose file
# to allow changes to files reflect on the container
WORKDIR /app

USER ${UID}

CMD ["node"]

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
