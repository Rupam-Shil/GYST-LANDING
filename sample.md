gyst commit

✗ No staged changes found.

✏️ Would you like to stage all changes? [y/N] y
✓ All changes have been staged ✨

✓ Commit message generated!

✨ Proposed commit message:
chore(indexer): update starting block numbers for debt token and loan spent indexers

✏️ Use this message? [Y/n/e(edit)] y
✓ Commit created successfully! ✨

✏️ Final Commit Message:
chore(indexer): update starting block numbers for debt token and loan spent indexers

---

gyst suggest
✓ Suggestions generated! ✨

? Select a commit message ›
chore(indexer): update block numbers for loan and debt token indexers
❯ chore(indexer): update starting blocks for debt token and loan spent indexers
chore(indexer): update block numbers for debt token price and loan spent indexers

---

gyst explain "how to I rename a branch"
✓ Analysis complete!

Here are the approaches to renaming a branch:

1. If you want to rename the CURRENT branch:

✏️ git branch -m <new-branch-name>
Renames the branch you're currently on
EXAMPLE: git branch -m feature-login

2. If you want to rename a DIFFERENT branch:

✏️ git branch -m <old-branch-name> <new-branch-name>
Renames a specific branch, even if you're not currently on it
EXAMPLE: git branch -m old-feature new-feature

3. If the branch has already been pushed to remote:

✏️ 1. git branch -m <new-branch-name> 2. git push origin -u <new-branch-name> 3. git push origin --delete <old-branch-name>
Rename locally, push new branch, delete old remote branch

---

gyst branch health —local

Branch Health Report

feat/branch-commands
├── Status: 🟢 Healthy
├── Age: 2 days
├── Last Activity: 2 days
├── Author: Varun
├── Commits: 47
└── Main Distance: 6 ahead, 0 behind

master
├── Status: 🟢 Healthy
├── Age: 3 days
├── Last Activity: 3 days
├── Author: Varun
├── Commits: 41
└── Main Distance: 0 ahead, 0 behind
