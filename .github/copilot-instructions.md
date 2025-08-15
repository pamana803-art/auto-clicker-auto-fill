# Project Overview

This is a Chrome extension for automation (Auto Clicker AutoFill) in an NX monorepo workspace. The repository uses a monorepo structure with shared packages and apps, enabling code reuse and consistent tooling.

## Workspace & Architecture

- **Monorepo / NX workspace**: All apps and packages live under a unified NX workspace for sharing, building, and dependency graph awareness.
- **Apps**
  - `/apps/acf-extension/src/background/`: Background logic, event listeners, messaging for the extension runtime.
  - `/apps/acf-extension/src/content-scripts/`: Content scripts that interact with web pages (click, fill, submit actions).
  - `/apps/acf-extension/src/common/`: Shared constants, types, and utilities used between background, content scripts, etc.
  - `/apps/acf-extension/src/devtools/`: DevTools panel for debugging and inspecting internal extension state.
  - `/apps/acf-extension/src/wizard/`: Wizard responsible for auto-recording user actions and storing them.
  - `/apps/acf-options-page/src/`: React-based options page used to configure the extension. Built with Vite and hosted separately at `stable.getautoclicker.com`.
  - `/apps/acf-acf-i18n/src/`: Internationalization resources for both the extension and the options page.
  - `/site/src/content/`: Documentation for the project, including guides, tutorials, and reference material.

- **Packages**
  - `/packages/core/common/src/`: Core utilities shared across the extension and options page.
  - `/packages/core/extension/src/`: Extension-specific utilities (actions, alarms, storage abstractions).
  - `/packages/core/service/src/`: Service utilities that drive extension API behavior via messaging.
  - `/packages/acf/common/src/`: ACF-specific shared utilities built for Auto Clicker AutoFill features.
  - `/packages/acf/events/src/`: Domain events like click, fill, submit for the ACF extension.
  - `/packages/acf/service/src/`: Service utilities for the ACF extension API, interacting through messaging.
  - `/packages/acf/store/src/`: Storage management for ACF, including configuration and settings.
  - `/packages/acf/util/src/`: Helper utilities (e.g., value updating) tailored for ACF.
  - `/packages/shared/*/src/`: Shared integrations and helpers used by both extension and options page, including:
    - `discord-messaging`, `discord-oauth`
    - `firebase-database`, `firebase-firestore`, `firebase-functions`, `firebase-oauth`, `firebase-storage`
    - `google-analytics`, `google-oauth`, `google-drive`, `google-sheets`
    - `notification`
    - `openai`
    - `sandbox`
    - `status-bar`
    - `util`
    - `vision`

## Tech Stack & Key Libraries

- **Frontend / UI**
  - React (functional components preferred)
  - react-bootstrap for UI primitives
  - dnd-kit for drag-and-drop interactions
  - monaco editor for userscript editing
  - tanstack/react-table for displaying actions in table format
  - react-i18next for internationalization
- **Build Tooling**
  - Vite: used for development and build of the options page.
  - Webpack: used to bundle the extension itself (background, content scripts, etc.).
- **Observability & Error Tracking**
  - Sentry: for catching, aggregating, and reporting runtime errors.
- **Backend & Integrations**
  - Firebase: various services used across shared packages (auth, database, storage, functions).
  - External messaging service used for communication between the hosted options page and the installed extension.
- **Hosting**
  - Options page hosted at `stable.getautoclicker.com` (separate origin).
  - Chrome extension is published on the Chrome Web Store.

## Communication

- Extension and options page communicate via an external messaging service (cross-origin), not direct DOM polling. Messaging patterns are abstracted in service packages and mediated through the appropriate event/action layers.

## Documentation

- All code changes, new features, or updates **must be reflected in the documentation** in `-site/src/content/`.
- Documentation should cover usage, configuration, API changes, and any user-facing behavior updates.
- Copilot should suggest or remind to update documentation whenever generating new code or modifying existing logic.

## Rules for Copilot

- Prefer functional React components; avoid class components.
- Follow trunk-based development: small, frequent commits to `main`.
- Utilities must have **no direct DOM dependencies**; side effects should be isolated.
- Use **ES modules** (`import`/`export`), never `require()`.
- Ensure new features are accompanied by test coverage.
- Consistency with shared package usage; avoid duplication when an existing shared utility suffices.
- Respect separation between core, ACF-specific, and shared layers.
- Always maintain documentation alongside code changes.

## Recommended Patterns

- Features should be broken down into composable pieces (actions → events → services → UI).
- Messaging should be explicit, typed, and versioned if evolving.
- Localization keys are managed centrally and consumed via `react-i18next` hooks.
- Error boundaries and Sentry breadcrumbs should wrap major UI surfaces.

## Build & Development Notes

- Use NX commands for orchestrated builds, linting, testing, and dependency-aware changes.
- Options page uses Vite dev server during development; production build is deployed to its host.
- Extension bundles go through Webpack with minimized output but with readable source maps for debugging in non-prod flows.

## Deployment & Distribution

- Options page: deployed to a stable site (`stable.getautoclicker.com`), separate origin from the extension.
- Chrome Extension: packaged and uploaded to Chrome Web Store; updates should align with semantic and user-impact versioning.
