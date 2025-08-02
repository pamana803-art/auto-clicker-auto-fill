# Contributing to Auto Clicker AutoFill

Thank you for your interest in contributing! Please follow these guidelines to help us maintain a high-quality project.

## Getting Started

- Fork the repository and clone your fork.
- Install dependencies using `npm install`.
- Use Nx commands for building, testing, and linting.
- Make sure your changes are covered by tests.

## Development Guidelines

- Use functional React components.
- Prefer ES modules (`import`/`export`), never `require()`.
- Utilities must not have direct DOM dependencies.
- Follow trunk-based development: small, frequent commits to `main`.
- Ensure consistency with shared package usage; avoid duplication.
- All new features must include test coverage.
- Use `react-i18next` for localization.
- Wrap major UI surfaces with error boundaries and Sentry breadcrumbs.

## Pull Requests

- Create a descriptive PR title and summary.
- Reference related issues if applicable.
- Ensure all checks pass before requesting review.

## Code of Conduct

Please read and follow our [Code of Conduct](docs/CODE_OF_CONDUCT.md).

Thank you for helping us improve Auto Clicker AutoFill!
