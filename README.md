# Notemind AI 🧠

> **Your AI-powered Meeting Assistant.**  
> Automatically joins Google Meet, records audio, and generates perfect summaries.

![Status](https://img.shields.io/badge/status-MVP-green)
![Tech](https://img.shields.io/badge/stack-Next.js_Node_Playwright-blue)

## 🚀 Product & User Journey

**Notemind** solves the problem of "distracted meeting participants" by taking notes for you.

### The User Journey
1.  **Sign Up**: User logs in to the **Web Dashboard**.
2.  **Connect Calendar**: User grants permission to read their Google Calendar.
3.  **Auto-Join**: When a meeting starts, the **Notemind Bot** automatically joins as a guest.
4.  **Recording**: The bot sits in the call, recording audio in high fidelity.
5.  **Processing**:
    -   Audio is transcribed (Speech-to-Text).
    -   AI generates a Summary, Action Items, and Key Decisions.
6.  **Review**: User visits the Dashboard to see the "Meeting Report" minutes after the call ends.

## 🏗️ Architecture (Monorepo)

This project is a **Monorepo** managed by [Turborepo](https://turbo.build/repo).

| Service | Path | Description |
| :--- | :--- | :--- |
| **Web** | `apps/web` | Next.js 14 Dashboard & Landing Page. |
| **API** | `apps/api` | Node.js/Express REST API & Queue Producers. |
| **Bot** | `apps/bot` | Headless Playwright Worker (Queue Consumer). |
| **UI** | `packages/ui` | Shared React Components (Tailwind/Shadcn). |
| **DB** | `packages/db` | Prisma ORM & Database Client. |

## 🛠️ Deployment & Local Setup

### Prerequisites
-   Docker Desktop
-   Node.js 18+ & pnpm

### Quick Start
1.  **Databases**: Start Postgres & Redis.
    ```bash
    cd docker && docker-compose up -d
    ```
2.  **Install**:
    ```bash
    pnpm install
    ```
3.  **Database Setup**:
    ```bash
    pnpm db:push
    ```
4.  **Run All Services**:
    ```bash
    pnpm dev
    ```
    -   Frontend: [http://localhost:3000](http://localhost:3000)
    -   API: [http://localhost:5001](http://localhost:5001)

### Production Deployment
Each app has a `Dockerfile` optimized for production using `turbo prune`.
-   **Web**: `apps/web/Dockerfile`
-   **API**: `apps/api/Dockerfile`
-   **Bot**: `apps/bot/Dockerfile`

## ✅ Quality Assurance
-   [x] **Type Safety**: Full TypeScript coverage across apps/packages.
-   [x] **Linting**: Shared ESLint configuration.
-   [x] **Build Verification**: `pnpm build` passes for all workspaces.
-   [x] **Infrastructure**: Functional Docker Compose for DB/Cache.
