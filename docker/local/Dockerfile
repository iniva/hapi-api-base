# STAGE: LOCAL - Development Environment
FROM node:dubnium-alpine as local

ARG UID=1000

COPY local.sh /
COPY start.sh /

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
