@echo off
git status > git_status.txt 2>&1
git diff --name-only > git_diff.txt 2>&1
git diff --cached --name-only > git_staged.txt 2>&1
echo Done
