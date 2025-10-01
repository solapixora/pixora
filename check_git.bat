@echo off
git status
echo.
echo === Git Log ===
git log --oneline -3
echo.
echo === Staged Changes ===
git diff --cached --name-only
echo.
echo === Unstaged Changes ===
git diff --name-only
