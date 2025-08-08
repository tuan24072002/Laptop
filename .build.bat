@echo off
setlocal

REM 
call npm run build || exit /b

REM 
call docker build -t laptop93 . || exit /b

REM 
call docker save -o laptop93.tar laptop93 || exit /b

REM 
call scp laptop93.tar root@103.126.161.32:/root/ || exit /b

REM 
call ssh root@103.126.161.32 "bash /root/deploy.sh"

pause
endlocal
