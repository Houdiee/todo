!#/bin/sh

set -x

JSON_DATA='
{
  "username": "ballsack",
  "entries": []
}
'

curl -X POST \
  -H "Content-Type: application/json" \
  -d "$JSON_DATA" \
  https://localhost:5001/api/entries/ \
  --insecure
