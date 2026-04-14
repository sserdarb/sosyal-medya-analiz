#!/bin/sh
set -e
API_KEY_VALUE="${GEMINI_API_KEY:-${API_KEY:-}}"
INDEX_FILE=/usr/share/nginx/html/index.html
if [ -n "$API_KEY_VALUE" ] && [ -f "$INDEX_FILE" ]; then
  sed -i "s|__RUNTIME_API_KEY__|$API_KEY_VALUE|g" "$INDEX_FILE"
fi
