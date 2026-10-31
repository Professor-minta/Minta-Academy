#!/usr/bin/env bash
# Lance Open WebUI hors ligne avec Mande-IA v3 (Linux, macOS).
# Prérequis : module 9 fait une fois (dossier ~/open-webui avec son environnement .venv).
set -e
cd "$HOME/open-webui"
source .venv/bin/activate
OFFLINE_MODE=true open-webui serve
