# 05 - AI Development Rules

## Purpose
This document dictates exactly how AI agents (like Claude, ChatGPT, or Gemini) must operate within this project environment.

## Scope
All AI-driven code generation, refactoring, and terminal commands.

---

## 1. How AI Should Work
- Treat the `docs/` folder as immutable law. Do not hallucinate architectures.
- Every prompt implements exactly one task from `04-DEVELOPMENT-ROADMAP.md`.
- Assume the persona of a Senior Staff Full Stack Engineer.

## 2. Rules for Editing Files
- Always read existing files (`view_file` or `grep_search`) before replacing content.
- Never blindly overwrite logic you do not fully understand.
- Preserve existing functionality unless explicitly instructed to replace it.

## 3. Rules for Creating Files
- Adhere strictly to the Feature-Based Architecture defined in `02-ARCHITECTURE.md` and `07-PROJECT-STRUCTURE.md`.
- Ensure new files include proper TypeScript interfaces and imports.

## 4. Rules for Refactoring
- Keep refactoring scoped exclusively to the requested feature.
- Do not refactor generic/global components unless instructed.

## 5. Rules for Deleting Code
- Do not delete code without understanding dependencies.
- Remove unused imports and dead code within the files currently being worked on.

## 6. Rules for Package Installation
- ONLY install packages listed in the approved TECH STACK.
- For new requirements, ask the user for permission before installing a package not listed in the Constitution.

## 7. Rules for Documentation Updates
- Never update the `docs/` files unless explicitly prompted by the user with: "Update the documentation."

## 8. Rules for Task Completion
- A task is complete only when the code is written, typed correctly, lints successfully, and visually conforms to the Design System.

## 9. Rules for Quality Checks
- Before finishing a turn, verify that no TypeScript errors (`any`, `ts-ignore`) were introduced.
- Run builds or linting commands in the background to verify correctness.

## 10. Rules for Reporting & Stopping
- After completing the exact requested task, summarize the actions taken concisely.
- STOP. Do not spontaneously begin the next task on the roadmap. Wait for the user's explicit next prompt.
- Never implement work outside the requested task scope.
