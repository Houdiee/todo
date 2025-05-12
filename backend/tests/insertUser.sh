!#/bin/sh

JSON_DATA=$(cat <<EOF
{
  "username": "${1}",
  "password": "${2}"
}
EOF
)

curl -X POST \
  -H "Content-Type: application/json" \
  -d "$JSON_DATA" \
  http://localhost:5000/api/user/ \
  --insecure
