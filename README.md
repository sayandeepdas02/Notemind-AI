# Notemind AI 🧠

![Status](https://img.shields.io/badge/status-MVP-green)
![Tech](https://img.shields.io/badge/stack-Next.js_Node_Playwright-blue)

> **Your AI-powered Meeting Assistant.**
> Automatically joins Google Meet, records audio, and generates perfect summaries.

**Notemind** is a production-grade AI application engineered with a **Domain-Driven Monorepo Architecture**. It solves the problem of "distracted meeting participants" by automating the note-taking process.

## 🚀 Features
-   **🤖 Autonomous Bot**: A headless Playwright worker that navigates Google Meet lobbies and joins calls as a guest.
-   **📅 Calendar Sync**: seamless integration with Google Calendar to auto-schedule recording jobs for upcoming meetings.
-   **📝 AI Summaries**: Transcribes audio and uses LLMs to generate actionable meeting notes (Bullet points, Action items).
-   **🖥️ Modern Dashboard**: A real-time Next.js interface for managing meetings and reviewing transcripts.

## 🏗️ Architecture (Domain-Driven)

This project uses a "Senior-Grade" folder structure, separating concerns by domain rather than tool type.

```text
/
├── frontend/           # User Interfaces
│   └── web/            # Next.js 14 App Router (Dashboard, Landing)
├── backend/            # Synchronous Services
│   └── api/            # Express REST API (Auth, Sync, Queue Producers)
├── workers/            # Asynchronous Workers
│   └── bot/            # Playwright Headless Worker (Queue Consumer)
├── packages/           # Shared Libraries
│   ├── db/             # Prisma ORM & Database Client
│   ├── ui/             # Shadcn/UI Components + Tailwind
│   ├── types/          # Shared Zod Schemas & TS Interfaces
│   └── config/         # Shared configurations
└── docker/             # Local Infrastructure (Postgres, Redis)
```

## 🛠️ Deployment & Local Setup

### Prerequisites
-   **Docker Desktop** (Required for DB & Redis)
-   **Node.js 18+** & **pnpm**

### Quick Start
1.  **Infrastructure**: Start PostgreSQL and Redis.
    ```bash
    cd docker && docker-compose up -d
    ```
2.  **Install Dependencies**:
    ```bash
    pnpm install
    ```
3.  **Environment Setup**:
    -   Copy `.env.example` to `.env` (if available) or ensure `DATABASE_URL` and `REDIS_HOST` are set.
    -   **Important**: For Google Calendar features, add your Google Client Credentials to `.env`:
        ```bash
        GOOGLE_CLIENT_ID=...
        GOOGLE_CLIENT_SECRET=...
        GOOGLE_REDIRECT_URI=http://localhost:5001/auth/google/callback
        ```
4.  **Database Init**:
    ```bash
    pnpm db:push
    ```
5.  **Run Development**:
    ```bash
    pnpm dev
    ```
    -   **Frontend**: [http://localhost:3000](http://localhost:3000)
    -   **API**: [http://localhost:5001](http://localhost:5001)

### Production Deployment
The project is optimized for containerized deployment. Each service has a `Dockerfile` that uses `turbo prune` to minimize image size.

-   **Frontend Image**: `frontend/web/Dockerfile`
-   **Backend Image**: `backend/api/Dockerfile`
-   **Worker Image**: `workers/bot/Dockerfile`

## 🧪 Quality Standards
This codebase is designed to be "Interview-Ready" and "Production-Grade":
-   **Strict Separation of Concerns**: Frontend cannot import Backend code directly.
-   **Type Safety**: End-to-end TypeScript coverage with shared Zod schemas.
-   **Scalability**: Async jobs are decoupled via **BullMQ (Redis)**, allowing the worker tier to scale independently of the API.
-   **Infrastructure-as-Code**: Fully dockerized development environment.

## 📜 License
MIT
