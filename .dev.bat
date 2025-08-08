@echo off
REM 
set "BASEDIR=%~dp0"

REM 
start cmd /k "cd /d %BASEDIR%client && npm run dev"
