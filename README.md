# Notemind AI 🧠

![Status](https://img.shields.io/badge/status-MVP-green)
![Tech](https://img.shields.io/badge/stack-Next.js_Node_SQLite-blue)
![Auth](https://img.shields.io/badge/auth-JWT-orange)

> **Your AI-powered Meeting Assistant.**
> Automatically joins Google Meet, records audio, and generates perfect summaries.

**Notemind** is a production-grade AI application engineered with a **Domain-Driven Monorepo Architecture**. It solves the problem of "distracted meeting participants" by automating the note-taking process.

## 🚀 Features

See [FEATURES.md](./FEATURES.md) for a detailed breakdown of implemented features.

-   **🔐 JWT Authentication**: Secure email/password signup and signin
-   **🤖 Autonomous Bot**: A headless Playwright worker that navigates Google Meet lobbies
-   **📅 Calendar Sync**: Google Calendar integration for auto-scheduling
-   **📝 AI Summaries**: Transcription and LLM-powered meeting notes
-   **🖥️ Modern Dashboard**: Real-time Next.js interface for managing meetings
-   **⚙️ Settings**: User profile management and password change

## 🏗️ Architecture (Domain-Driven)

```text
/
├── frontend/           # User Interfaces
│   └── web/            # Next.js 14 App Router (Dashboard, Landing)
├── backend/            # Synchronous Services
│   └── api/            # Express REST API (Auth, Meetings, Calendar)
├── workers/            # Asynchronous Workers
│   └── bot/            # Playwright Headless Worker (Queue Consumer)
├── packages/           # Shared Libraries
│   ├── db/             # Prisma ORM & SQLite Database
│   ├── ui/             # Shadcn/UI Components + Tailwind
│   ├── types/          # Shared Zod Schemas & TS Interfaces
│   └── config/         # Shared configurations
```

## 🛠️ Local Setup

### Prerequisites
-   **Node.js 18+** & **pnpm**

### Quick Start

1.  **Install Dependencies**:
    ```bash
    pnpm install
    ```

2.  **Database Init**:
    ```bash
    cd packages/db && npx prisma db push
    ```

3.  **Run Development**:
    ```bash
    # Terminal 1: Backend
    cd backend/api && npm run dev
    
    # Terminal 2: Frontend
    cd frontend/web && npm run dev
    ```
    -   **Frontend**: [http://localhost:3000](http://localhost:3000)
    -   **API**: [http://localhost:5001](http://localhost:5001)

### Environment Variables
```bash
# packages/db/.env
DATABASE_URL="file:./dev.db"

# backend/api (optional)
JWT_SECRET="your-secret-key"
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

## 📄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Create account |
| POST | `/auth/signin` | Login |
| GET | `/auth/me` | Get current user |
| PUT | `/auth/password` | Change password |
| GET | `/meetings` | List user's meetings |
| POST | `/meetings` | Add notetaker to GMeet |
| GET | `/meetings/:id` | Meeting details |

## 🧪 Quality Standards
-   **Strict Separation of Concerns**: Frontend cannot import Backend code directly
-   **Type Safety**: End-to-end TypeScript coverage
-   **Scalability**: Async jobs via BullMQ, SQLite for development simplicity

## 📜 License
MIT
