@echo off
powershell -Command "& { $Host.UI.RawUI.WindowTitle = 'GameX Status' }"
color e
pause
cls
:a
node .
goto a