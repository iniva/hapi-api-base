#!/bin/sh
cd /app

echo "Installing Packages"
yarn install

echo "${APP_NAME} Server Waiting Instructions"
exec tail -f /dev/null
