# AGENTS

## PR Review Fix Workflow

When addressing GitHub PR review comments in this repo, use this sequence:

1. Resolve the target PR and fetch unresolved review threads first.
2. Group comments by file or behavior area and fix them locally.
3. Run the smallest relevant verification step before publishing.
   - For site/layout changes, prefer `bundle exec jekyll build`.
4. Stage only the files that belong to the review fix.
5. Commit with a focused message.
6. Push the branch.
7. Reply on each addressed review thread with a short note describing the fix.
8. Mark each addressed review thread as resolved.
9. Re-check thread state to confirm unresolved threads are cleared.

## PR Merge And Cleanup Workflow

When the user asks to merge a PR after review fixes:

1. Merge the PR on GitHub with the requested strategy.
   - If the user asks for a merge commit, use the `merge` method.
2. Fetch from origin and switch local checkout to `main`.
3. Fast-forward local `main` to `origin/main`.
4. Delete the merged feature branch locally.
5. Delete the merged feature branch on origin.
6. Confirm the local worktree is clean at the end.

## Scope Discipline

- Do not stage unrelated user changes.
- Do not resolve review threads until the corresponding fix is pushed.
- Prefer concise thread replies that mention the concrete fix and commit when helpful.
