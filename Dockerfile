# STAGE: LOCAL - Development Environment
FROM node:carbon-alpine as local

# The source code is mounted on the docker-compose file
# to allow changes to files reflect on the container
WORKDIR /usr/src/app
COPY scripts/ /

CMD ["node"]

# STAGE: BUILDER - Pre-release stage
FROM node:carbon-alpine as builder

WORKDIR /app
COPY ./server /app/server
COPY ./site /app/site

RUN set -x; \
    cd /app/server \
    && yarn install \
    && yarn build

CMD ["node"]

# STAGE: TESTING - Assertion step
FROM builder as tester

RUN set -x; \
    echo "no tests for now"

# STAGE: RELEASE
FROM node:carbon-alpine as release

ENV SERVER_PORT=8091
ENV YARN_CACHE_FOLDER="/app/.cache/yarn"

COPY --from=builder /app /app
RUN chgrp -R 0 /app && \
    chmod -Rf g+rwX /app

EXPOSE $SERVER_PORT
WORKDIR /app/server

CMD ["yarn", "start:dist"]
