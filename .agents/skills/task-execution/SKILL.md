---
name: task-execution
description: Standard workflow for executing assigned tasks under the Avengers Protocol, including autonomous multi-task execution, context isolation, focused editing, and progress tracking.
---

# Task Execution Workflow

## Purpose
Standard operating procedure for any agent (Jarvis, Friday, Edith, Thor, Thanos, Ultron) when implementing assigned tasks from `planning/task.md`.

---

## ⚡ Autonomous Execution Directive ("No Need Permissions, Finish All Tasks")
> **User Override Instruction**: When the user specifies "no need permissions finish all tasks" or directs end-to-end implementation:
> 1. **Zero Intermediate Halts**: Do NOT stop or ask for confirmation between sequential tasks.
> 2. **Continuous Task Transition**: When a task meets its acceptance criteria and passes verification, immediately update its status to `DONE`, promote the next dependency-ready task to `IN_PROGRESS`, and continue execution.
> 3. **Proactive Command Execution**: Execute all required commands (migrations, builds, tests, component generation, linter checks) proactively without asking permission.
> 4. **Aesthetic Standard ("Fancy Design Mandatory")**: All frontend deliverables must look visually stunning, premium, and alive with fluid animations, glowing glassmorphism, tailored water gradients, and micro-interactions.

---

## Standard Execution Steps

### 1. Task Intake & Ownership
- Identify the active `TASK-ID` in `planning/task.md` and load its dedicated file: `planning/tasks/${TASK-ID}.md`.
- Verify you are the assigned agent (`Assignee`).
- Check that all prerequisite `Dependencies` are marked `DONE`.
- Confirm that the task status is `READY`. Change status to `IN_PROGRESS` in both `planning/task.md` and `planning/tasks/${TASK-ID}.md`.

### 2. Context Loading (Isolated & Focused — 90% Token Reduction)
- Load **only** the direct files required for this task:
  - The granular task file: `planning/tasks/${TASK-ID}.md`.
  - The relevant technical contract referenced in the task file (e.g., `docs/08-api-contract.md` or `development/frontend/DESIGN_GUIDELINES.md`).
  - The specific source code files to modify or test.
- **Rule**: Do not read unrelated directories or full repository listings.

### 3. Implementation
- Make focused, surgical changes.
- Reuse existing components, hooks, domain services, and utilities.
- Never rewrite entire files when replacing a targeted function or block.
- Follow domain rules:
  - **Frontend**: Fancy, WOW-factor aesthetics, 6 UI States, accessible markup, WCAG 2.2 AA.
  - **Backend**: DTO validation, service business logic, transaction safety.

### 4. Verification Check
- Run focused checks (type-check, linter, unit test for modified file).
- If checks fail, fix the issue immediately before reporting completion.

### 5. Checkpoint & Reporting
- Update `planning/tasks/${TASK-ID}.md` with actual test verification logs and mark status (`DONE`).
- Synchronize status in the master board: `planning/task.md`.
- Update `planning/updateplanning.md`.
- If in autonomous mode, immediately transition to the next ready task!
