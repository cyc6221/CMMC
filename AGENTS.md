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

## Operational Rules

- Do not run Git index-writing commands in parallel.
- Treat `git add`, `git commit`, `git switch`, `git branch`, `git merge`, and similar ref/index updates as sequential operations.
- If Git fails with `.git/index.lock` or ref-lock errors during parallel work, stop parallelization and rerun the affected Git steps one by one.
- Do not mix remote-sync Git commands with immediate dependent reads in parallel when correctness matters.
- After `git fetch` or a merge on GitHub, re-run `git rev-parse`, `git branch -vv`, or similar state checks sequentially.

## Sandbox And Network Rules

- If a Git command needs to write under `.git` and fails with permission errors in the sandbox, rerun it with escalation.
- If a networked Git command fails with sandbox-style connection errors, rerun it with escalation instead of assuming the remote is broken.
- Typical commands that may need escalation in this repo include `git add`, `git commit`, branch creation/deletion, and networked `git push`.

## Protected Main Rules

- Assume `main` may reject direct pushes due to repository rules.
- If a direct push to `main` is rejected because changes must go through a pull request, do not keep retrying the same push.
- Create a dedicated branch from the local commit, push that branch, open a PR, and merge it through GitHub.
- After moving a local commit off `main` onto a PR branch, realign local `main` to `origin/main` before continuing.

## Cleanup Rules

- After merging a PR, clean both the local branch and the remote branch unless the user asks to keep them.
- When cleanup requires leaving the current branch, switch to `main` first, fast-forward it, then delete the merged feature branch.
- Finish by confirming the current branch and a clean worktree.
