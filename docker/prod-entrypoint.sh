#!/bin/bash
set -e

# Migrate db
yarn workspace backend migrate

# Run prod
exec "$@"
