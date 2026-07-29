#!/usr/bin/env bash
set -euo pipefail

repo_root="$(
  cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."
  pwd
)"

cd "$repo_root/backend"

uv run python -c \
  'import json; from app.main import app; print(json.dumps(app.openapi()))' \
  > "$repo_root/frontend/openapi.json"

cd "$repo_root/frontend"

bun run generate-api
bun run typecheck
bun run lint
