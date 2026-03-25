---
name: commit
description: Create a git commit with conventional commit format and emoji
argument-hint: Optional flags like --no-verify to skip pre-commit hooks
---

# Commit

Create well-formatted commits with conventional commit messages.

## Process

1. Check for staged changes (`git status`)
2. If no staged changes, review and stage appropriate files
3. Run pre-commit checks (unless --no-verify)
4. Analyze changes to determine commit type
5. Generate descriptive commit message
6. Include scope if applicable: `type(scope): description`
7. Add body for complex changes explaining why
8. Execute commit

## Commit Types

| Emoji | Type     | Description                                       |
| ----- | -------- | ------------------------------------------------- |
| ✨    | feat     | New features                                      |
| 🐛    | fix      | Bug fixes                                         |
| 📝    | docs     | Documentation changes                             |
| ♻️    | refactor | Code restructuring without changing functionality |
| 🎨    | style    | Code formatting, missing semicolons, etc.         |
| ⚡️    | perf     | Performance improvements                          |
| ✅    | test     | Adding or correcting tests                        |
| 🧑‍💻    | chore    | Tooling, configuration, maintenance               |
| 🚧    | wip      | Work in progress                                  |
| 🔥    | remove   | Removing code or files                            |
| 🚑    | hotfix   | Critical fixes                                    |
| 🔒    | security | Security improvements                             |

## Format

```
<emoji> <type>(<optional scope>): <description>

<optional body>

<optional footer>
```

## Best Practices

- Keep commits atomic and focused
- Write in imperative mood ("Add feature" not "Added feature")
- Explain why, not just what
- Reference issues/PRs when relevant
- Split unrelated changes into separate commits

## Usage

- `/commit` - Standard commit with pre-commit checks
- `/commit --no-verify` - Skip pre-commit checks

## Examples

```
✨ feat(auth): add OAuth2 login support

Implements Google and GitHub OAuth providers.
Closes #123
```

```
🐛 fix(api): prevent null pointer in user validation

The error occurred when email field was undefined.
```

```
♻️ refactor: simplify database connection pooling
```

> Source: https://github.com/NikiforovAll/github-copilot-rules (116 ⭐)
