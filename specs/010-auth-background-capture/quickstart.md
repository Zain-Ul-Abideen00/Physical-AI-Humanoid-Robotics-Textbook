# Quickstart: Authentication & Profiles

## 1. Environment Setup

Access `d:\GIAIC\Quarter 4\Hackathon\Project 1\humanoid-robotics`

**1.1. Auth Service (Node.js)**
```bash
# In one terminal
cd auth-service
npm install
# Ensure .env has DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL
npm run dev
# Verification: curl http://localhost:3001/api/auth/health (if health check exists)
# or check standard better-auth endpoint like /api/auth/session
```

**1.2. Backend Service (Python)**
```bash
# In second terminal
cd backend
uv sync
# Ensure .env has BETTER_AUTH_URL=http://localhost:3001
uv run uvicorn main:app --reload
```

**1.3. Frontend (Docusaurus)**
```bash
# In third terminal
cd frontend
npm install
npm start
```

## 2. Testing the Flow

1.  **Anonymous Chat**: Open `http://localhost:3000`. Send a message via chat widget. Check DB to see `chat_messages` with NULL `user_id`. Note the `session_id` in localStorage.
2.  **Signup**: Click "Sign In" -> "Sign Up".
    *   Enter Email/Pass.
    *   **Expect**: Redirect to/Presentation of "Complete Profile" form.
3.  **Profile Creation**:
    *   Fill Software/Hardware Background.
    *   Submit.
    *   **Expect**: User logged in, Profile created in DB (`user_profiles`).
4.  **Session Merge**:
    *   **Expect**: Previous anonymous chat messages now have your `user_id`.
5.  **New Chat**: Send message. Check DB. `user_id` should be populated.

## 3. Key Commands

**Database Migration (Application Tables)**
```bash
cd backend
uv run alembic revision --autogenerate -m "add_user_profiles"
uv run alembic upgrade head
```

**Database Migration (Auth Tables)**
Auth tables are auto-managed by Better-Auth in dev mode usually, or via:
```bash
cd auth-service
npm run db:migrate
```
