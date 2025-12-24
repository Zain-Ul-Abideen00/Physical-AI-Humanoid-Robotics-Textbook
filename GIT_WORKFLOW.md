# Git Workflow Guide: Syncing Master

This guide documents how to switch from a feature branch to `master`, ensure it is up-to-date with the remote repository, and keep your local environment synchronized.

## Prerequisites

- Ensure you have `git` installed.
- Ensure you are in the root directory of the project.

## Step-by-Step Guide

### 1. Check Your Status
Before switching branches, ensure your current work is committed or stashed.

```bash
git status
```
*If you have uncommitted changes, commit them or use `git stash`.*

### 2. Switch to Master Branch
Checkout the local `master` branch.

```bash
git checkout master
```

### 3. Pull Latest Changes
Fetch the latest changes from the remote repository (`origin`) and merge them into your local branch.

```bash
git pull origin master
```

### 4. Verify Sync (Optional)
Check that your local branch matches the remote.

```bash
git status
```
*Output should say: "Your branch is up to date with 'origin/master'."*

## Quick Command
You can combine these steps into a single command sequence:

```bash
git checkout master && git pull origin master
```

## Troubleshooting

- **Merge Conflicts**: If `git pull` results in conflicts, you must resolve them manually in the affected files, then run `git add .` and `git commit`.
- **Unstaged Changes**: If `git checkout` fails due to local changes, stash them (`git stash`), switch branches, and then apply them later (`git stash pop`) if needed on the targeted branch.
