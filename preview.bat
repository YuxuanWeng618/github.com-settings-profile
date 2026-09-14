@echo off
setlocal
cd /d "%~dp0"

set "PY="
where python >nul 2>nul && set "PY=python"
if not defined PY where py >nul 2>nul && set "PY=py"
if not defined PY (
  echo.
  echo   Python not found on PATH.
  echo   Install Python, or run any other static server in this folder.
  echo.
  pause
  exit /b 1
)

echo.
echo   Starting local server on http://127.0.0.1:3000/
echo.

start "portfolio-site server" /min %PY% -m http.server 3000 --bind 127.0.0.1
timeout /t 2 /nobreak >nul
start "" http://127.0.0.1:3000/play/

echo   Home      http://127.0.0.1:3000/
echo   Play      http://127.0.0.1:3000/play/
echo   Project   http://127.0.0.1:3000/project.html?slug=kaia
echo.
echo   The server runs in the minimized window titled
echo   "portfolio-site server". Close that window to stop it.
echo.
echo   Tip: press Ctrl+Shift+R on first load to bypass the cache.
echo.
pause
