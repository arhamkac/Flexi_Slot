#!/bin/bash

# Kill any process using port 5173
echo "Checking for processes using port 5173..."
lsof -ti:5173 | xargs kill -9 2>/dev/null || echo "No process found on port 5173"

# Wait a moment for the port to be released
sleep 2

# Navigate to frontend directory and start the development server
echo "Starting frontend development server..."
cd FlexiSlot-Frontend && npm run dev 