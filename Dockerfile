# STAGE: BUILDER
FROM node:dubnium-alpine as builder

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
RUN yarn install

COPY . /app

RUN yarn build

# STAGE: TESTING
FROM builder as tester

RUN yarn test

# STAGE: PRERELEASE
FROM node:dubnium-alpine as prerelease

COPY --from=builder /app/package.json /tmp/package.json
COPY --from=builder /app/yarn.lock /tmp/yarn.lock

RUN cd /tmp \
    && yarn install --production

WORKDIR /app

COPY --from=builder /app /app
RUN rm -rf /app/node_modules \
    && cp -a /tmp/node_modules /app

# STAGE: RELEASE
FROM node:dubnium-alpine as release

ENV SERVER_PORT=8091

COPY --from=prerelease /app /app

EXPOSE $SERVER_PORT
WORKDIR /app

CMD ["yarn", "start:dist"]
