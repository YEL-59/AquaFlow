# Open Questions & Client Clarifications

> **Rule**: When requirements, business logic, permissions, edge cases, or UX flows are ambiguous, Iron Man and all agents must log them here rather than inventing assumptions.

---

## Active Questions

| Question ID | Date Logged | Domain | Question Description | Impacted Agent | Status | Resolution |
|---|---|---|---|---|---|---|
| `Q-004` | 2026-11-04 | Integrations | Which Bangladesh SMS gateway provider (e.g., SSL Wireless, Greenweb, Elitbuzz) will be used for production phone OTPs? *(A mock OTP provider is enabled for dev/testing)* | `edith`, `ultron` | `OPEN` | Pending client vendor credentials |
| `Q-005` | 2026-11-04 | Payments | When bKash merchant account credentials and SSLCOMMERZ store ID become available, which will be activated first for online payments? | `edith`, `friday` | `OPEN` | Phase 6 integration (COD and manual recording active initially) |
| `Q-006` | 2026-11-04 | Compliance | Are there specific BSTI license registration numbers and batch lab report templates to store in the batch document management module? | `edith`, `iron_man` | `OPEN` | Generic batch & document attachment schema provided |

---

## Resolved Questions Log

| Question ID | Date Resolved | Domain | Resolution Summary |
|---|---|---|---|
| `Q-001` | 2026-11-04 | Auth | JWT access tokens with short TTL + HttpOnly SameSite refresh cookies + Phone OTP verification confirmed in PRD 15.1. |
| `Q-002` | 2026-11-04 | Mobile | Native mobile apps out of scope for MVP; mobile-first web dashboard for delivery staff confirmed in PRD 2.2. |
| `Q-003` | 2026-11-04 | Infrastructure | Multi-stage Docker + Nginx reverse proxy target on Linux VPS confirmed in PRD 10.1 & 10.4. |
