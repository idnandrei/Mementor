#! /usr/bin/env bash

set -e
set -x

# let the db start
python -m app.backend_prestart

# run migrations
alembic upgrade head

# create initial data in db
python -m app.initial_data
