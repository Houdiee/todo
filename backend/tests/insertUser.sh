!#/bin/sh

set -x

JSON_DATA='
{
  "username": "admin",
  "password": "admin"
}
'

curl -X POST \
  -H "Content-Type: application/json" \
  -d "$JSON_DATA" \
  https://localhost:5001/api/user/ \
  --insecure
