# Quickstart: ChatKit Integration

## Prerequisites
- Python 3.11+ with `uv` installed
- Node 18+

## Setup

1. **Backend Dependencies**:
   ```bash
   cd backend
   uv add "openai-chatkit<=1.4.0" "openai-agents[litellm]>=0.6.2"
   uv sync
   ```

2. **Frontend Dependencies**:
   ```bash
   cd frontend
   npm install @openai/chatkit-react
   ```

## Running the App

1. **Start Backend**:
   ```bash
   cd backend
   uv run uvicorn main:app --reload --port 8000
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm start
   ```

## Verification

1. Go to `http://localhost:3000` (or Docusaurus port).
2. Click the floating chat icon in the bottom-right.
3. Send a message: "What is a servo motor?".
4. Verify you receive a streaming response containing textbook information.
