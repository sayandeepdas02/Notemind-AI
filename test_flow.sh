#!/bin/bash

# Signup
echo "Signing up..."
SIGNUP_RES=$(curl -s -X POST http://localhost:5001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"password123","name":"Test User"}')

TOKEN=$(echo $SIGNUP_RES | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  # Try signin
  echo "Signup failed (maybe user exists), trying signin..."
  SIGNIN_RES=$(curl -s -X POST http://localhost:5001/auth/signin \
    -H "Content-Type: application/json" \
    -d '{"email":"testuser@example.com","password":"password123"}')
  TOKEN=$(echo $SIGNIN_RES | grep -o '"token":"[^"]*' | cut -d'"' -f4)
fi

echo "Token: $TOKEN"

if [ -z "$TOKEN" ]; then
  echo "Failed to get token"
  exit 1
fi

# Create Meeting
echo "Creating Meeting..."
MEETING_RES=$(curl -s -X POST http://localhost:5001/meetings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"meetingUrl":"https://meet.google.com/abc-defg-hij","title":"Test Meeting"}')

echo "Meeting Response: $MEETING_RES"
MEETING_ID=$(echo $MEETING_RES | grep -o '"id":"[^"]*' | cut -d'"' -f4)

if [ -z "$MEETING_ID" ]; then
  echo "Failed to create meeting"
  exit 1
fi

echo "Meeting ID: $MEETING_ID"

# Check Status (Initial)
echo "Checking Status (Initial)..."
STATUS_RES=$(curl -s -H "Authorization: Bearer $TOKEN" http://localhost:5001/meetings/$MEETING_ID)
echo "Status: $STATUS_RES"

# Wait for worker
echo "Waiting 2s for RUNNING..."
sleep 2
STATUS_RES=$(curl -s -H "Authorization: Bearer $TOKEN" http://localhost:5001/meetings/$MEETING_ID)
echo "Status (Should be RUNNING or COMPLETED): $STATUS_RES"

echo "Waiting 6s for COMPLETED..."
sleep 6
STATUS_RES=$(curl -s -H "Authorization: Bearer $TOKEN" http://localhost:5001/meetings/$MEETING_ID)
echo "Final Status: $STATUS_RES"
