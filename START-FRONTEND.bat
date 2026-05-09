@echo off
title ReguGuard — Frontend (port 3000)
cd /d "%~dp0reguguard"
echo.
echo  Starting Next.js — http://localhost:3000
echo  Keep this window OPEN while you use the site.
echo.

where npm >nul 2>&1
if %ERRORLEVEL%==0 (
  npm run dev
  goto :end
)
if exist "%~dp0node-portable\npm.cmd" (
  call "%~dp0node-portable\npm.cmd" run dev
  goto :end
)
echo ERROR: npm not found. Install Node.js LTS from https://nodejs.org
echo Or run START-PRESENTATION.bat from this folder for backend + frontend.
pause
exit /b 1

:end
pause
