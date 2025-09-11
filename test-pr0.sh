#!/bin/bash

# PR#0 Test Script
echo "🚀 PR#0 Test & Validation Script"
echo "================================"

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 2. Build the project
echo "🔨 Building project..."
npm run build

# 3. Run development server in background
echo "🌐 Starting development server..."
npm run dev &
DEV_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 10

# 4. Check if server is running
echo "🔍 Checking server status..."
curl -I http://localhost:3000 | head -n 1

# 5. Run Playwright tests
echo "🧪 Running Playwright tests..."
npx playwright test e2e/pr0-cookie-header.spec.ts --reporter=list

# 6. Kill development server
echo "🛑 Stopping development server..."
kill $DEV_PID

echo "✅ Test script completed!"
