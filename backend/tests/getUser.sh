!#/bin/sh

set -x

JSON_DATA='
{
  "username": "ballsack"
}
'

curl -X GET \
  -H "Content-Type: application/json" \
  https://localhost:5001/api/user/ballsack \
  --insecure

