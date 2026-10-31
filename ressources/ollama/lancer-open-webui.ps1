# Lance Open WebUI hors ligne avec Mande-IA v3 (Windows, PowerShell).
# Prérequis : module 9 fait une fois (dossier $HOME\open-webui avec son environnement .venv).
Set-Location "$HOME\open-webui"
& ".\.venv\Scripts\Activate.ps1"
$env:OFFLINE_MODE = "true"
Start-Process "http://localhost:8080"
open-webui serve
