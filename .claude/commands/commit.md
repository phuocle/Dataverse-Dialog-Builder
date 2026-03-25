# Commit

Create well-formatted commits with conventional commit messages.

## Process

1. Run `git status` to check for staged/unstaged changes
2. If no staged changes, review and stage appropriate files (avoid secrets like .env, credentials)
3. Run `git diff --cached` to analyze staged changes
4. Run `git log --oneline -5` to check recent commit style
5. Determine the commit type based on changes
6. Generate a descriptive commit message following the format below
7. Execute the commit

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
```

## Best Practices

- Keep commits atomic and focused
- Write in imperative mood ("Add feature" not "Added feature")
- Explain why, not just what
- Reference issues/PRs when relevant
- Split unrelated changes into separate commits

$ARGUMENTS
