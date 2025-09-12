#!/bin/bash

# Frontend API Switch Test
echo "🎨 Frontend API Switch Test"
echo "============================"

# Save current env
cp .env.local .env.local.backup 2>/dev/null || true

# Test with Python API
echo "NEXT_PUBLIC_API_URL=https://avukatajanda.onrender.com" > .env.local

echo "📝 Current .env.local:"
cat .env.local

echo ""
echo "🚀 Starting Next.js in test mode..."
echo "Please test the following:"
echo "1. Open http://localhost:3000"
echo "2. Try to register a new user"
echo "3. Try to login"
echo "4. Check dashboard stats"
echo ""
echo "Press Ctrl+C to stop the test"
echo ""

npm run dev
