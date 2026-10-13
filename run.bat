@echo off
setlocal
cd /d "%~dp0"

where py >nul 2>nul
if %errorlevel%==0 (
    start "Sprout Lab" cmd /k "cd /d "%~dp0" && py -m http.server 4174 --directory dist"
) else (
    where python >nul 2>nul
    if errorlevel 1 (
        echo Python was not found. Install Python, then run this file again.
        pause
        exit /b 1
    )
    start "Sprout Lab" cmd /k "cd /d "%~dp0" && python -m http.server 4174 --directory dist"
)

timeout /t 2 /nobreak >nul
start "" "http://localhost:4174"
endlocal
