#!/bin/sh

USER=$( cat /etc/passwd | grep $1 | sed -e 's/:.*//g' )
if [ "$USER" = "" ]; then
    adduser -u ${1} -S developer -G node
fi
