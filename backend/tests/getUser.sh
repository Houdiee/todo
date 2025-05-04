!#/bin/sh

curl -X GET \
  -H "Content-Type: application/json" \
  https://localhost:5001/api/user/$1 \
  --insecure

