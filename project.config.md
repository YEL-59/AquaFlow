# ⚙️ Project Configuration: Avengerse

> **Version**: 1.0  
> **Codename**: AquaFlow  
> **Primary AI Environment**: OpenAI Codex & Compatible Multi-Agent Assistants  
> **Architecture**: Hierarchical Multi-Agent Full-Stack System  
> **Chief Orchestrator**: `iron_man`  

---

> [!NOTE]
> **Developer Directive**:  
> This file is the **Single Source of Truth** for technical stack configuration.  
> `iron_man`, `jarvis`, `friday`, `edith`, `thor`, `thanos`, and `ultron` strictly read this file to determine what libraries, frameworks, databases, and architectural patterns to implement. Configured specifically for **AquaFlow** based on client PRD.

---

## 1. Project Information & Metadata

- **Project Name**: AquaFlow
- **Project Type**: Bilingual Water Supply, E-Commerce, Subscription & Operations Platform
- **Project Status**: `new`
- **Client Requirements Source**: [README.md](README.md)
- **Problem & Product Summary**: Bilingual water supply, bottled water e-commerce, 20L jar delivery subscription, multi-location inventory, delivery dispatch, and business accounting platform serving households, offices, and commercial customers in Dhaka.
- **Target Audience / End Users**: Dhaka households, offices, restaurants, retail shops, delivery staff, inventory managers, operations team, and business owners.
- **Target Delivery / Milestones**: Phase 0-6 phased implementation (MVP Storefront, Orders, Delivery & Jar Ledger, Subscriptions, Finance, Online Payments).

---

## 2. Avengers Multi-Agent Roster & System Mapping

| Agent Name | Hero Identity | Primary Domain | Configuration File | Target Directory |
|---|---|---|---|---|
| **`iron_man`** | **Chief Orchestrator** | Planning, Delegation, Work Breakdown & Verification | `.codex/agents/iron_man.toml` | Root, `planning/`, `docs/` |
| **`jarvis`** | **UI/UX & Design** | Design Tokens, Typography, Wavio Analysis, 6 UI States | `.codex/agents/jarvis.toml` | `development/frontend/src/styles/`, UI Primitives |
| **`friday`** | **Frontend Web** | React, Vite, JavaScript, Tailwind v4, shadcn/ui, i18n | `.codex/agents/friday.toml` | `development/frontend/` |
| **`edith`** | **Backend & Data** | Express.js, Prisma ORM, PostgreSQL, Redis, REST APIs | `.codex/agents/edith.toml` | `development/backend/` |
| **`thor`** | **Mobile (Optional)** | Mobile Dashboard (Idle — Native apps out of scope for initial release) | `.codex/agents/thor.toml` | `development/mobile/` |
| **`thanos`** | **QA & Verification** | Unit, Integration, E2E (Playwright), Invariant Tests | `.codex/agents/thanos.toml` | Test suites across repository |
| **`ultron`** | **DevOps & Security** | Docker, Nginx, CI/CD, Cyber Security Hardening | `.codex/agents/ultron.toml` | `infrastructure/`, `.github/` |

---

## 3. Technology Stack Specification

### 3.1 Frontend Configuration (`development/frontend/`)
> *Friday and Jarvis strictly adhere to these frontend choices.*
- **Directory**: `development/frontend/`
- **Framework**: `React (Vite)`
- **Language**: `JavaScript / JSX`
- **Styling**: `Tailwind CSS v4` + Semantic CSS Variables
- **UI Primitives**: `shadcn/ui` + `Radix UI` accessible primitives
- **Client UI State**: `Redux Toolkit` (minimal shared state) / React Context
- **Server State / Data Fetching**: `TanStack Query (React Query)`
- **Routing**: `React Router (v6+)`
- **Form & Validation**: `React Hook Form` + `Zod`
- **Localization**: `i18next` + `react-i18next` (English and Bangla)
- **Charts & Visualizations**: `Recharts`
- **Icons**: `lucide-react`
- **Testing**: `Vitest` + `React Testing Library` + `Playwright` (E2E)

### 3.2 Backend Configuration (`development/backend/`)
> *Edith strictly adheres to these backend choices.*
- **Directory**: `development/backend/`
- **Framework**: `Express.js (Modular Domain Architecture)`
- **Runtime Environment**: `Node.js >= 20.x LTS`
- **Language**: `JavaScript / Node.js`
- **ORM / Database Client**: `Prisma ORM`
- **Primary Database**: `PostgreSQL (v15+)`
- **Cache & Queue**: `Redis` (Session caching, rate limiting, background job queues)
- **Timezone**: `Asia/Dhaka` (UTC+6)
- **Monetary Types**: `Decimal / NUMERIC` (zero floating point for BDT)
- **API Documentation**: `REST (OpenAPI / Swagger specification)`
- **Validation**: `Zod` schema validation
- **Logging**: `Winston` structured JSON logging + `Morgan`
- **Background Jobs**: Scheduled cron worker for recurring subscriptions & reminders
- **Testing**: `Jest` + `Supertest`

### 3.3 Mobile Configuration (`development/mobile/` — Optional)
> *Thor is activated only when native mobile applications are explicitly scheduled.*
- **Enabled**: `false` *(Initial release uses responsive web and a dedicated mobile-first Delivery Staff Dashboard as specified in PRD 2.2)*
- **Directory**: `development/mobile/`

### 3.4 Infrastructure & DevOps (`infrastructure/`)
> *Ultron strictly adheres to these infrastructure choices.*
- **Docker**: `infrastructure/docker/` (Multi-stage Dockerfiles for minimal production images)
- **Reverse Proxy**: `infrastructure/nginx/` (Nginx reverse proxy, SSL termination, gzip)
- **CI/CD Pipeline**: `.github/workflows/ci.yml` (Automated validation, lint, test, build)
- **Package Manager**: `pnpm` (default) or `npm`
- **Runtime Environment**: `Node.js >= 20.x LTS`
- **Production Hosting Target**: `Linux VPS / Docker Swarm / Cloud VPS`

---

## 4. Shared Project Contracts & Directory Mapping

| Artifact Type | File / Path | Primary Agent Responsibility |
|---|---|---|
| **Client Intent / Brief** | [README.md](README.md) | Single Source of Truth filled by Developer/Client |
| **System Blueprints** | [docs/](docs/) (`01` to `14`) | Maintained by `iron_man`, `edith`, `jarvis`, `ultron` |
| **API Contract** | [docs/08-api-contract.md](docs/08-api-contract.md) | Shared bridge between `edith`, `friday`, and `thor` |
| **Task Management** | [planning/task.md](planning/task.md) | Work breakdown with `Assignee` tags |
| **Session Continuity** | [planning/updateplanning.md](planning/updateplanning.md) | Checkpoints, test evidence, and active task state |
| **Architecture Decisions** | [planning/decisions.md](planning/decisions.md) | Approved ADRs and design decisions |
| **Open Questions** | [planning/open-questions.md](planning/open-questions.md) | Unresolved client queries (Zero-Assumption Policy) |
| **Application Code** | [development/](development/) | Domain code for `frontend/`, `backend/`, and `mobile/` |

---

## 5. Working Agreements & Human Approval Gates

1. **Human Approval Gates (Strict Authorization Required)**:
   - ⚠️ Destructive database migrations (dropping tables, altering production data).
   - ⚠️ Live production deployments or publishing releases.
   - ⚠️ Altering production secrets, API keys, or environment files (`.env`).
   - ⚠️ Major architectural deviations from `docs/` or `project.config.md`.
2. **Zero-Assumption Policy**: Unconfirmed requirements must be recorded in `planning/open-questions.md` rather than guessed by agents.
3. **Context Isolation**: Every agent loads only the specific files required for its current task to ensure **minimum token usage and maximum output quality**.
4. **Evidence-Based Verification**: No task is marked `DONE` without verification by `thanos` with actual test execution evidence.
