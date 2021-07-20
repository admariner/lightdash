#!/bin/bash
set -e
dbt seed --project-dir /usr/app/dbt --profiles-dir /usr/app/profiles --full-refresh
dbt run --project-dir /usr/app/dbt --profiles-dir /usr/app/profiles
yarn workspace backend migrate
yarn workspace backend seed
exec "$@"
