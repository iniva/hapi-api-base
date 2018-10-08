#!/bin/sh
cd /app

echo "Removing node_modules folder"
rm -rf node_modules

echo "Installing Packages"
yarn install

echo "${APP_NAME} Server Waiting Instructions"
exec tail -f /dev/null
