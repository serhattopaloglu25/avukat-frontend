#!/bin/bash

echo "🚀 AvukatAjanda Deployment Script"
echo "================================="

# Frontend deployment
echo "📦 Deploying Frontend to Vercel..."
cd frontend
git add .
git commit -m "deploy: frontend update"
git push origin main

# Backend deployment
echo "🔧 Deploying Backend to Render..."
cd ../backend
git add .
git commit -m "deploy: backend update"
git push origin main

echo "✅ Deployment triggered successfully!"
echo "Check deployment status:"
echo "- Vercel: https://vercel.com/dashboard"
echo "- Render: https://dashboard.render.com"
