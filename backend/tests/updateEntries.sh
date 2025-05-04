!#/bin/sh

JSON_DATA=$(cat <<EOF
{
  "username": "${1}",

  "entries": [

    {
      "title": "Clean up your room",
      "isCompleted": false
    },

    {
      "title": "Do your weekend duties",
      "isCompleted": true
    },

    {
      "title": "Memorise surah qiyama",
      "isCompleted": false
    }
  ]
}
EOF
)

curl -X POST \
  -H "Content-Type: application/json" \
  -d "$JSON_DATA" \
  https://localhost:5001/api/entries/ \
  --insecure
