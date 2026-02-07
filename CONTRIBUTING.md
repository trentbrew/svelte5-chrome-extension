# Contributing to Svelte 5 Chrome Extension

First off, thank you for considering contributing to this project! 🎉

This document provides guidelines and workflows for contributing to this Chrome extension template.

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Issue Reporting](#issue-reporting)
- [Community Guidelines](#community-guidelines)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)
- Basic knowledge of Svelte 5, TypeScript, and Chrome Extensions

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/svelte5-chrome-extension.git
   cd svelte5-chrome-extension
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

---

## 🔄 Development Workflow

### Branch Naming Convention

Use descriptive branch names with prefixes:

- `feature/` - New features (e.g., `feature/shadow-dom-support`)
- `fix/` - Bug fixes (e.g., `fix/icon-rendering-issue`)
- `docs/` - Documentation updates (e.g., `docs/add-api-reference`)
- `refactor/` - Code refactoring (e.g., `refactor/component-structure`)
- `test/` - Adding or updating tests (e.g., `test/add-unit-tests`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

### Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Type check
npm run check

# Lint
npm run lint

# Format code
npm run format
```

### Testing Your Changes

1. Build the extension: `npm run build`
2. Load the `dist/` folder as an unpacked extension in Chrome
3. Test all affected functionality
4. Verify no console errors
5. Check that existing features still work

---

## 🔀 Pull Request Process

### 1. Create a Feature Branch

**Never push directly to `master`.** Always work on a feature branch.

```bash
git checkout -b fix/your-issue-name
```

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed
- Test thoroughly

### 3. Commit Your Changes

Follow the [commit message guidelines](#commit-message-guidelines):

```bash
git add .
git commit -m "feat: add shadow DOM support

Fixes #1

This implements CSS isolation using Shadow DOM for content scripts.
- Add shadowDOM utility
- Add cssInjector utility
- Update documentation

Co-Authored-By: Your Name <your.email@example.com>"
```

### 4. Push Your Branch

```bash
git push -u origin fix/your-issue-name
```

### 5. Open a Pull Request

Using GitHub CLI:
```bash
gh pr create --title "feat: Your feature title" --body "Description of changes"
```

Or via the GitHub web interface.

### 6. PR Description Template

```markdown
## Summary
Brief description of what this PR does

Fixes #[issue-number]

## Changes
- List of changes made
- Each change on a new line

## Testing
- [ ] Tested in Chrome
- [ ] No console errors
- [ ] Existing features still work
- [ ] Documentation updated

## Screenshots (if applicable)
Add screenshots or GIFs showing the changes

## Additional Notes
Any other context or information reviewers should know
```

### 7. Tag the Issue Reporter

If your PR fixes an issue, tag the reporter:

```markdown
@username Could you test this fix and verify it resolves your issue?

Here's how to test:
1. Step-by-step instructions
2. What to look for
3. Expected behavior

Let me know if you have any questions!
```

### 8. Address Review Feedback

- Respond to all comments
- Make requested changes
- Push updates to the same branch
- Re-request review when ready

### 9. Merge

Once approved, the PR will be merged by a maintainer.

---

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

**Feature:**
```
feat(shadow-dom): add CSS isolation utilities

Implements mountInShadow and injectCSS utilities for
complete CSS isolation in shadow DOM.

Fixes #1
```

**Bug Fix:**
```
fix(icons): resolve Lucide icons not rendering in shadow root

Ensures all CSS including icon definitions are injected
into shadow DOM.

Fixes #2
```

**Documentation:**
```
docs(readme): add Shadow DOM usage guide

Adds comprehensive documentation for shadow DOM features
including API reference and examples.
```

### Footer Keywords

- `Fixes #123` - Closes issue #123
- `Closes #123` - Closes issue #123
- `Refs #123` - References issue #123

---

## 🎨 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Add type annotations for function parameters and return types
- Avoid `any` types when possible
- Use interfaces for object shapes

### Svelte

- Use Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`)
- Keep components small and focused
- Use TypeScript in script blocks: `<script lang="ts">`
- Follow existing component structure

### Styling

- Use TailwindCSS utility classes
- Leverage DaisyUI components when possible
- Keep custom CSS minimal
- Follow existing theme system

### Code Style

- Use 2 spaces for indentation
- Add trailing commas in objects/arrays
- Use single quotes for strings
- Add semicolons
- Maximum line length: 100 characters

### File Organization

```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   │   └── ui/         # UI components (Button, Card, etc.)
│   ├── stores/         # Svelte stores
│   ├── utils/          # Utility functions
│   └── icons/          # Icon exports
├── pages/              # Page components
├── examples/           # Example code
└── main.ts             # Entry point
```

---

## 🐛 Issue Reporting

### Before Opening an Issue

1. Check if the issue already exists
2. Search closed issues for solutions
3. Test with the latest version
4. Provide clear reproduction steps

### Issue Template

```markdown
## Description
Clear description of the issue

## Steps to Reproduce
1. Step one
2. Step two
3. Expected vs actual behavior

## Environment
- Chrome version: [e.g., 120.0.0]
- Extension version: [e.g., 1.0.0]
- OS: [e.g., macOS 14.0]

## Screenshots
Add screenshots if applicable

## Additional Context
Any other relevant information
```

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested

---

## 🤝 Community Guidelines

### Be Respectful

- Be welcoming to newcomers
- Be patient with questions
- Provide constructive feedback
- Assume good intentions

### Communication

- Use clear, concise language
- Provide context in discussions
- Link to relevant issues/PRs
- Tag people appropriately with `@username`

### Code Reviews

**As a Reviewer:**
- Provide specific, actionable feedback
- Explain *why* changes are needed
- Praise good solutions
- Approve when satisfied

**As an Author:**
- Respond to all comments
- Ask for clarification if needed
- Don't take feedback personally
- Thank reviewers for their time

---

## 🎯 Quick Reference

### First Time Contributing?

1. Fork the repo
2. Create a branch: `git checkout -b fix/my-fix`
3. Make changes and commit: `git commit -m "fix: description"`
4. Push: `git push origin fix/my-fix`
5. Open a PR and tag the issue reporter for testing
6. Wait for review and address feedback

### Responding to Issues

When someone opens an issue:

1. **Acknowledge quickly** (within 24-48 hours)
   ```markdown
   Thanks for reporting this! I'll look into it.
   ```

2. **Update when you start working on it**
   ```markdown
   I'm working on a fix for this in branch `fix/issue-name`
   ```

3. **Link your PR when ready**
   ```markdown
   I've opened PR #X to fix this. Could you test it?
   ```

4. **Thank them after resolution**
   ```markdown
   Fixed in #X! Thanks for reporting this. 🎉
   ```

---

## 📚 Resources

- [Svelte 5 Documentation](https://svelte.dev/docs)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 📞 Getting Help

- Open an issue for bugs or feature requests
- Tag maintainers with `@username` for urgent matters
- Check existing issues and PRs for similar questions

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE.md).

---

Thank you for contributing! 🚀
