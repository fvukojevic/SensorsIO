#!/bin/bash

set -e

DB_HOST="$1"
shift

while ! mysqladmin ping -h"$DB_HOST" --silent; do
  >&2 echo "Database is unavailable - sleeping"
  sleep 1
done

>&2 echo "Building go service..."
go build -o /bin/project

echo "Starting project..."
chmod 777 /bin/project

/bin/project
