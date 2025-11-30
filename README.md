# ASA Sports Betting — Starter

This is a starter project for **ASA Sports Betting** (React frontend + Firebase Cloud Functions)
with sandbox-ready wrappers for MTN MoMo and Airtel Money.

**What is included**
- `frontend/` — Vite + React app (call cloud function endpoints for payments)
- `functions/` — Firebase Cloud Functions (Express app exposing /initiate-payment and webhooks)
- `firestore.rules` — example security rules
- `.env.example` — environment variables to set
- `README.md` — this file

**Important**
- You must register for MTN MoMo and Airtel developer keys (sandbox) and populate Firebase Functions config.
- This starter is *not* production-ready — it omits full signature verification, KYC, rate-limiting, and administrative tooling.

See the project files for usage and deployment notes.
