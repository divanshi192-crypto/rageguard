@echo off
title ReguGuard — starting servers…
cd /d "%~dp0"

echo.
echo  Starting ReguGuard for your presentation…
echo  - Backend:  http://localhost:8000  (API + /docs)
echo  - Website: http://localhost:3000
echo.

if not exist "backend\.venv\Scripts\python.exe" (
  echo ERROR: Run once in backend folder:  python -m venv .venv
  echo          then:  .venv\Scripts\pip install -r requirements.txt
  pause
  exit /b 1
)

start "ReguGuard API (8000)" cmd /k "cd /d "%~dp0backend" && .venv\Scripts\python.exe main.py"

timeout /t 2 /nobreak >nul

set "NPM_CMD=npm"
where npm >nul 2>&1
if errorlevel 1 (
  if exist "%~dp0node-portable\npm.cmd" set "NPM_CMD=%~dp0node-portable\npm.cmd"
)

if not exist "reguguard\node_modules" (
  echo Installing frontend dependencies (first time only)…
  pushd reguguard
  call %NPM_CMD% install
  popd
)

start "ReguGuard Website (3000)" cmd /k "cd /d "%~dp0reguguard" && %NPM_CMD% run dev"

echo.
echo  Waiting for Next.js to boot…
timeout /t 8 /nobreak >nul

start http://localhost:3000
start http://localhost:8000/docs

echo.
echo  Two black windows should stay open — API and Website. Do not close them.
echo  Browser tabs should open. If 3000 fails, wait 10s and refresh.
echo.
pause
