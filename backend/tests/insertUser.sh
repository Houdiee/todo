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
  https://localhost:5001/api/user/ \
  --insecure
