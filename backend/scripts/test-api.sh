#!/bin/bash
BASE_URL="http://localhost:3000/api/v1"

echo "1. Creating a story..."
RESPONSE=$(curl -s -X POST $BASE_URL/stories -H "Content-Type: application/json" -d '{"content": "I feel anxious today", "mood": "anxious"}')
echo "Response: $RESPONSE"
STORY_ID=$(echo $RESPONSE | grep -o '"id":"[^"]*"' | head -1 | cut -d':' -f2 | tr -d '"')

if [ -z "$STORY_ID" ]; then
    echo "Failed to create story"
    exit 1
fi
echo "Story ID: $STORY_ID"

echo "2. Getting stories..."
curl -s $BASE_URL/stories | grep "I feel anxious today" > /dev/null && echo "Story found." || echo "Story not found."

echo "3. Adding reaction..."
curl -s -X POST $BASE_URL/stories/$STORY_ID/reactions -H "Content-Type: application/json" -d '{"type": "hug"}'

echo "4. Reporting story..."
curl -s -X POST $BASE_URL/stories/$STORY_ID/report -H "Content-Type: application/json" -d '{"reason": "Testing report"}'

echo "5. Getting resources..."
curl -s $BASE_URL/resources
