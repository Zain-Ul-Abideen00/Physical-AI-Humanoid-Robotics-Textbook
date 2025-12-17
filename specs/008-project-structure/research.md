# Research: Deployment Feasibility

**Feature**: Project Structure & Deployment
**Date**: 2025-12-17

## 1. Executive Summary

We evaluated whether to deploy the RAG backend and frontend on Vercel versus GitHub Pages/Other platforms.

**Decisions:**
1.  **Structure**: **Option A (Unified Backend)**. Move API and RAG services into `backend/`.
    *   *Rationale*: This structure is deployment-agnostic. It works for Vercel (monorepo support) and Docker/Railway (standard Python app).
2.  **Frontend Deployment**: **Vercel** (Recommended) or GitHub Pages.
    *   *Rationale*: While GitHub Pages is free and currently set up, moving to Vercel unifies the "Project" view, offering atomic deployments and consistent preview environments for both frontend and backend.
3.  **Backend Deployment**: **Vercel (Trial)** with fallback to **Railway/Render**.
    *   *Rationale*: Vercel Serverless is convenient but has strict limits (10-60s timeout, 250MB size). A complex RAG pipeline *might* hit these limits. However, `gemini-2.5-flash` is fast. We will attempt Vercel first; if it fails, the `backend/` folder is ready for Railway without code changes.

---

## 2. Detailed Findings

### Backend + RAG on Vercel

**Question**: Can we deploy our backend + rag chatbot on vercel?

**Feasibility**: **Marginal / High Risk**
*   **Pros**: Easy integration, review apps, free tier generous for simple apps.
*   **Cons**:
    *   **Timeouts**: Vercel Hobby tier has a **10-second** timeout. Pro has 60s. RAG (Embed -> Search -> Generate) often exceeds 10s.
    *   **Bundle Size**: 250MB limit. `langchain`, `pandas`, `server-side agents` can be heavy.
    *   **Statelessness**: Requires external DB (Neon Postgres) for chat history (We already have this).

**Mitigation**:
*   Use `gemini-2.5-flash` (fastest model).
*   Optimize dependencies (avoid heavy data science libs if possible).
*   **Fallback**: If Vercel timeouts occur, we deploy the *same* `backend` directory to **Railway** or **Render** (container-based, no timeouts).

### Frontend: GitHub Pages vs Vercel

**Question**: Should we keep it on Github Pages or deploy on separate Vercel project?

**Comparison**:
*   **GitHub Pages**: Free, static hosting only, slower builds (Actions), no built-in preview URLs for PRs (requires actions setup).
*   **Vercel**: Free, faster global CDN, **Automatic Preview URLs** for every PR, Zero-config for Docusaurus.

**Recommendation**: **Switch to Vercel**.
*   Since you are considering Vercel for backend, hosting frontend there simplifies management (one dashboard).
*   Migration is trivial (`verel.json` or just UI setup).

## 3. Recommended Project Structure

To support these options, the "Option A" structure is optimal:

```text
root/
├── apps/ (deprecated/removed, mapped to top-level)
├── frontend/           # Docusaurus (Vercel Project A)
│   ├── package.json
│   └── vercel.json     # Frontend config
├── backend/            # FastAPI + RAG (Vercel Project B or Railway)
│   ├── main.py
│   ├── services/       # RAG logic
│   ├── requirements.txt
│   └── vercel.json     # Backend config
├── .gitignore
└── vercel.json         # Optional monorepo config
```

## 4. Alternatives Considered

*   **Option B (Separate RAG folder)**: Rejected. Python import machinery gets complex when splitting codebases unless using packages. Monorepo tools for Python are less mature than JS. Keeping RAG inside Backend is safer for imports.
