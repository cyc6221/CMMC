# AGENTS

## PR Review Fix Workflow

When addressing GitHub PR review comments in this repo, use this sequence:

1. Open or locate the target PR and load unresolved review threads first.
2. Group comments by file or behavior area, summarize the actionable items for the user, and wait for the user's direction before fixing them locally.
3. Run the smallest relevant verification step before publishing.
   - For site/layout changes, prefer `bundle exec jekyll build`.
4. Stage only the files that belong to the review fix.
5. Commit with a focused message.
6. Push the branch.
7. Reply on each addressed review thread with a short note describing the fix.
8. Mark each addressed review thread as resolved.
9. Re-check thread state to confirm unresolved threads are cleared.

## PR Review Loop After Opening a PR

After a PR is opened, expect the review cycle to continue in rounds:

1. When new review comments arrive, inspect them first and summarize the actionable items for the user.
2. Present the comments as a concise outline so the user can decide what to change.
3. Wait for the user's direction on which fixes to make before editing.
4. Implement the selected fixes locally.
5. Stage only the intended files, then commit and push the branch update.
6. Reply to the addressed review comments or review threads with a short note describing the fix.
7. Mark the addressed review threads as resolved.
8. Re-check for any remaining or newly added comments.
9. Wait for the next review round and repeat the same loop.

## PR Merge And Cleanup Workflow

When the user asks to merge a PR after review fixes:

1. Before any merge action, stop and ask the user for confirmation.
2. Ask which merge strategy to use before merging.
   - Confirm whether to use `merge` (create a merge commit), `squash`, or `rebase`.
   - Do not choose the merge strategy implicitly unless the user already specified it in the current request.
3. Merge the PR on GitHub with the user-confirmed strategy.
   - If the user asks for a merge commit, use the `merge` method.
4. Fetch from origin and switch local checkout to `main`.
5. Fast-forward local `main` to `origin/main`.
6. Delete the merged feature branch locally.
7. Delete the merged feature branch on origin if it still exists.
8. Confirm the local worktree is clean at the end.

## Scope Discipline

- Do not stage unrelated user changes.
- Do not resolve review threads until the corresponding fix is pushed.
- Prefer concise thread replies that mention the concrete fix and commit when helpful.

## Operational Rules

- Do not run Git index-writing commands in parallel.
- Treat `git add`, `git commit`, `git switch`, `git branch`, `git merge`, and similar ref/index updates as sequential operations.
- If Git fails with `.git/index.lock` or ref-lock errors during parallel work, stop parallelization and rerun the affected Git steps one by one.
- Do not run `git fetch`, `git pull`, or `git push` in parallel with dependent reads such as `git rev-parse`, `git branch -vv`, `git status`, or other checks of refs, branches, or worktree state when those reads need the updated remote or branch state to be correct.
- After `git fetch` or a merge on GitHub, re-run `git rev-parse`, `git branch -vv`, or similar state checks sequentially.

## Sandbox And Network Rules

- In this repo, "rerun it with escalation" means rerun the same command with only the additional capability it needs in the current tool: filesystem-write permission for `.git` updates, network access for remote operations, or both if required.
- If a Git command needs to write under `.git` and fails with permission errors in the sandbox, rerun it with filesystem-write permission enabled so it can update `.git`.
- If a networked Git command fails with sandbox-style connection errors, rerun it with network access enabled instead of assuming the remote is broken.
- Typical commands that may need escalation in this repo include `git add`, `git commit`, branch creation/deletion, and networked `git push`; use only the specific permission or network capability required by the command.

## Protected Main Rules

- Assume `main` may reject direct pushes due to repository rules.
- If a direct push to `main` is rejected because changes must go through a pull request, do not keep retrying the same push.
- Create a dedicated branch from the local commit, push that branch, open a PR, and merge it through GitHub.
- After moving a local commit off `main` onto a PR branch, realign local `main` to `origin/main` before continuing.

## Cleanup Rules

- After merging a PR, delete the local branch and delete the remote branch unless the user asks to keep them.
- When cleanup requires leaving the current branch, switch to `main` first, fast-forward it, then delete the merged feature branch.
- Finish by confirming the current branch and a clean worktree.
