@echo off
setlocal
title LinkqGlobal Consulting
cd /d "%~dp0"

where node.exe >nul 2>&1
if errorlevel 1 (
    echo.
    echo Node.js is required to run this project.
    echo Install Node.js 22.12 or newer from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

node "%~dp0scripts\start-local.mjs" %*
set "LINKQ_EXIT_CODE=%ERRORLEVEL%"
if not "%LINKQ_EXIT_CODE%"=="0" (
    echo.
    echo LinkqGlobal could not start. See the message above for the next step.
    pause
)
endlocal & exit /b %LINKQ_EXIT_CODE%
