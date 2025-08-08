@echo off
setlocal

set "BASEDIR=%~dp0"

echo
cd /d "%BASEDIR%client" || exit /b
call npm run build || exit /b

echo
cd /d "%BASEDIR%" || exit /b
call npm run start

pause
endlocal
