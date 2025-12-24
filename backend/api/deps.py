import os
from datetime import datetime
from typing import Annotated, Optional
from pydantic import BaseModel
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from services.db import Database

# --- Models ---
class UserSession(BaseModel):
    """Represents the authenticated user"""
    id: str
    email: str | None = None
    name: str | None = None
    email_verified: bool = False

# --- Logic ---

# We make HTTPBearer optional (auto_error=False) so we can check cookies if header is missing
security = HTTPBearer(auto_error=False)

async def get_current_user_token(
    request: Request,
    token_auth: Annotated[Optional[HTTPAuthorizationCredentials], Depends(security)]
) -> str:
    """
    Extracts the session token from Bearer header OR 'better-auth.session_token' cookie.
    Returns the raw token string.
    """
    token = None

    # 1. Try Bearer Token
    if token_auth:
        token = token_auth.credentials
        print(f"DEBUG: Found Bearer token: {token[:10]}...", flush=True)

    # 2. Try Cookie
    if not token:
        token = request.cookies.get("better-auth.session_token")
        if token:
           print(f"DEBUG: Found Cookie token: {token[:10]}...", flush=True)
        else:
           print("DEBUG: No token in cookie either.", flush=True)

    if not token:
        # Debug headers to see what's actually arriving
        print(f"DEBUG: Headers received: {request.headers}", flush=True)
        print(f"DEBUG: Cookies received: {request.cookies}", flush=True)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication credentials (Header or Cookie)"
        )

    return token

async def get_current_user(
    token: Annotated[str, Depends(get_current_user_token)]
) -> UserSession:
    """
    Validates the session token against the database and returns the User.
    """
    # Query public.session to find the session
    # Note: 'session' is a keyword, usually better-auth uses "session"
    print(f"DEBUG: Validating token: {token[:10]}...")
    session_row = await Database.fetchrow(
        'SELECT "userId", "expiresAt" FROM public."session" WHERE token = $1',
        token
    )

    if not session_row:
        print(f"DEBUG: Session lookup failed for token {token[:10]}...")
        # Check if table exists or is empty (optional, but helpful once)
        # count = await Database.fetchval('SELECT count(*) FROM public."session"')
        # print(f"DEBUG: Total sessions in DB: {count}")
        raise HTTPException(status_code=401, detail="Invalid session token")

    expires_at = session_row['expiresAt']
    # Ensure expires_at is timezone-aware comparison if needed.
    # asyncpg returns datetime. usually timezone aware if column is timestamptz.
    # If naive, assume UTC.

    if expires_at.tzinfo is None:
        # Fallback if DB returns naive (though we defined timestamptz)
        now = datetime.now()
    else:
        now = datetime.now(expires_at.tzinfo)

    if now > expires_at:
        raise HTTPException(status_code=401, detail="Session expired")

    user_id = session_row['userId']

    # Fetch user details
    user_row = await Database.fetchrow(
        'SELECT name, email, "emailVerified" FROM public."user" WHERE id = $1',
        user_id
    )

    if not user_row:
        # Session exists but user doesn't? Data integrity issue.
        raise HTTPException(status_code=401, detail="User not found")

    return UserSession(
        id=user_id,
        email=user_row['email'],
        name=user_row['name'],
        email_verified=user_row['emailVerified']
    )

async def get_current_user_token_optional(
    request: Request,
    token_auth: Annotated[Optional[HTTPAuthorizationCredentials], Depends(security)]
) -> str | None:
    token = None
    if token_auth:
        token = token_auth.credentials
    if not token:
        token = request.cookies.get("better-auth.session_token")
    return token

async def get_optional_current_user(
    token: Annotated[str | None, Depends(get_current_user_token_optional)]
) -> UserSession | None:
    if not token:
        return None
    try:
        # Re-use logic or call get_current_user?
        # get_current_user raises HTTPException, so valid for try/except wrap
        # But Depends injection is cleaner if we just copy logic or extract it.
        # Let's just manually query to avoid complex wrapping of Depends.
        session_row = await Database.fetchrow('SELECT "userId", "expiresAt" FROM public."session" WHERE token = $1', token)
        if not session_row: return None

        expires_at = session_row['expiresAt']
        now = datetime.now(expires_at.tzinfo) if expires_at.tzinfo else datetime.now()
        if now > expires_at: return None

        user_row = await Database.fetchrow('SELECT name, email, "emailVerified" FROM public."user" WHERE id = $1', session_row['userId'])
        if not user_row: return None

        return UserSession(
            id=session_row['userId'],
            email=user_row['email'],
            name=user_row['name'],
            email_verified=user_row['emailVerified']
        )
    except Exception:
        return None
