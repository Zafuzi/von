@echo off
setlocal

set "user_name=zafuzi"
set "game_title=von"

REM Check for -z
echo %* | findstr /C:"-z" >nul
if not errorlevel 1 (
    echo creating dist.zip
    if exist dist.zip del /f /q dist.zip
    powershell -Command "Compress-Archive -Path 'dist\*' -DestinationPath 'dist.zip' -Force"
)

REM Check for -p
echo %* | findstr /C:"-p" >nul
if not errorlevel 1 (
    REM Edit this line to push to itch
    butler push dist %user_name%/%game_title%:html5
)

REM Check for -s
echo %* | findstr /C:"-s" >nul
if not errorlevel 1 (
    butler status %user_name%/%game_title%:html5
)

endlocal