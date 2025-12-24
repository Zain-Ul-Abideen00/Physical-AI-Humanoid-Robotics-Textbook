### 1. Check Connection
Kill Running Tasks:
```bash
taskkill /F /IM uvicorn.exe /T

taskkill /F /IM node.exe /T
```

### 1. Check Connection
Initialize Chat tables:
```bash
uv run python scripts/init_chat_db.py
```

### 1. Check Connection
Initialize User Profile tables:
```bash
uv sync; uv run scripts/create_user_profiles.py
```

### 1. Check Connection
Better Auth DB Migrate:
```bash
npm install; npx better-auth migrate --config src/auth.ts
```
