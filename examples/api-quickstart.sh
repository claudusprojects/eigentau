#!/bin/bash
# Eigentau API Quickstart
# Run this script to create an API key, agent, upload a file, and chat.

API="https://router-production-cb1b.up.railway.app"

echo "=== 1. Create API Key ==="
KEY=$(curl -s -X POST "$API/v1/keys" \
  -H "Content-Type: application/json" \
  -d '{"name":"my-first-key"}' | python3 -c "import sys,json;print(json.load(sys.stdin)['key'])")
echo "Your API key: $KEY"
echo ""

echo "=== 2. Create Agent ==="
AGENT_ID=$(curl -s -X POST "$API/v1/agents" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $KEY" \
  -d '{
    "name": "Research Bot",
    "description": "Analyzes Bittensor ecosystem data",
    "systemPrompt": "You are an expert analyst of the Bittensor ecosystem. Be concise, data-driven, and insightful."
  }' | python3 -c "import sys,json;print(json.load(sys.stdin)['id'])")
echo "Agent ID: $AGENT_ID"
echo ""

echo "=== 3. Upload Knowledge File ==="
curl -s -X POST "$API/v1/agents/$AGENT_ID/files" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $KEY" \
  -d '{
    "filename": "context.txt",
    "content": "Bittensor has 129 active subnets. TAO is trading around $314. The network distributes ~7200 TAO daily in emissions. Top subnets by emission: SN1 Apex (inference), SN64 Chutes (serverless), SN3 Templar (training)."
  }'
echo ""

echo "=== 4. Chat with Agent ==="
curl -s -X POST "$API/v1/agents/$AGENT_ID/chat" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $KEY" \
  -d '{"message": "What are the top subnets by emission and why?"}' | python3 -m json.tool
echo ""

echo "=== Done! ==="
echo "Your API key: $KEY"
echo "Your agent ID: $AGENT_ID"
echo ""
echo "Use these in your Telegram/Discord bot:"
echo "  EIGENTAU_API_KEY=$KEY"
echo "  EIGENTAU_AGENT_ID=$AGENT_ID"
