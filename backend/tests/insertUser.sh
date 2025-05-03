!#/bin/sh

set -x

JSON_DATA='
{
  "username": "bruhity",
  "password": "sigma"
}
'

curl -X POST \
  -H "Content-Type: application/json" \
  -d "$JSON_DATA" \
  https://localhost:5001/api/user/ \
  --insecure
