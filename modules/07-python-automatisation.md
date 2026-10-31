---
numero: 7
titre: Python et automatisation
phase: Développement
duree: 3 heures
objectif: Écrire des petits programmes Python qui font le travail répétitif à ta place, puis les lancer tout seuls sur le serveur.
---

## Pourquoi Python

Python se lit presque comme du français et sert partout : administration de serveurs, traitement de fichiers Excel ou CSV, données, intelligence artificielle. Un script de 20 lignes peut t'éviter une heure de travail chaque semaine.

## 1. Installer Python

- **Windows** : télécharge Python 3.12 sur [python.org](https://www.python.org/downloads/). Pendant l'installation, **coche « Add python.exe to PATH »**.
- **Ubuntu** : Python 3 est déjà installé. Ajoute les outils : `sudo apt install -y python3-venv python3-pip`

Vérifie :

```bash
python --version
```

Sur Linux, la commande s'appelle souvent `python3`.

## 2. Un environnement par projet

Un **environnement virtuel** garde les bibliothèques d'un projet séparées des autres.

```bash
mkdir automatisation && cd automatisation
python -m venv .venv
```

Active-le :

- Windows (PowerShell) : `.venv\Scripts\Activate.ps1`
- Linux ou macOS : `source .venv/bin/activate`

Installe une bibliothèque :

```bash
pip install requests
```

Ajoute `.venv/` à ton `.gitignore`.

## 3. Les bases en 10 lignes

```python
nom = "Awa"
age = 22
villes = ["Bamako", "Ségou", "Sikasso"]

print(f"I ni ce {nom}, tu as {age} ans.")
for ville in villes:
    if ville == "Ségou":
        print(ville, ": la cité des balanzans")
    else:
        print(ville)
```

## 4. Script 1 : sauvegarder un dossier chaque jour

`sauvegarde.py` crée une archive datée et garde seulement les 7 dernières :

```python
import shutil
from datetime import datetime
from pathlib import Path

SOURCE = Path("/www/wwwroot/mondomaine.com")
DESTINATION = Path("/www/backup/sites")
A_GARDER = 7

DESTINATION.mkdir(parents=True, exist_ok=True)
nom = DESTINATION / f"site-{datetime.now():%Y-%m-%d}"
shutil.make_archive(str(nom), "zip", SOURCE)
print("Sauvegarde créée :", nom.with_suffix(".zip"))

archives = sorted(DESTINATION.glob("site-*.zip"))
for ancienne in archives[:-A_GARDER]:
    ancienne.unlink()
    print("Supprimée :", ancienne.name)
```

## 5. Script 2 : vérifier que tes sites répondent

`surveille.py` :

```python
import requests

SITES = [
    "https://mintaservices.com",
    "https://ia.mintaservices.com",
]

for url in SITES:
    try:
        reponse = requests.get(url, timeout=15)
        etat = "OK" if reponse.status_code == 200 else f"PROBLÈME ({reponse.status_code})"
    except requests.RequestException as erreur:
        etat = f"INJOIGNABLE ({erreur.__class__.__name__})"
    print(f"{etat:30} {url}")
```

## 6. Script 3 : calculer des totaux dans un fichier CSV

Un fichier `ventes.csv` exporté depuis Excel :

```text
date,produit,quantite,prix
2026-10-01,Savon,10,250
2026-10-01,Huile,3,1500
2026-10-02,Savon,4,250
```

`ventes.py` :

```python
import csv
from collections import defaultdict

totaux = defaultdict(int)
with open("ventes.csv", encoding="utf-8") as fichier:
    for ligne in csv.DictReader(fichier):
        totaux[ligne["produit"]] += int(ligne["quantite"]) * int(ligne["prix"])

for produit, total in sorted(totaux.items(), key=lambda x: -x[1]):
    print(f"{produit:10} {total:>10,} FCFA".replace(",", " "))
print(f"{'TOTAL':10} {sum(totaux.values()):>10,} FCFA".replace(",", " "))
```

## 7. Lancer un script tout seul sur le serveur

Copie tes scripts dans `/www/wwwroot/scripts`, puis dans aaPanel : **Cron → Add task**

| Réglage | Valeur |
|---|---|
| Type | Shell Script |
| Période | Tous les jours, 2 h du matin |
| Script | `cd /www/wwwroot/scripts && /usr/bin/python3 sauvegarde.py >> sauvegarde.log 2>&1` |

Le `>> sauvegarde.log 2>&1` garde la trace de chaque exécution, avec les erreurs.

Sans aaPanel, la même chose se fait avec `crontab -e` :

```text
0 2 * * * cd /www/wwwroot/scripts && /usr/bin/python3 sauvegarde.py >> sauvegarde.log 2>&1
```

## Bonnes pratiques

- Les chemins, adresses et réglages **en haut du script**, en MAJUSCULES : on les change sans chercher dans le code.
- Les mots de passe dans des variables d'environnement, jamais dans le script.
- Un script qui supprime des fichiers se teste d'abord sur une **copie**.

## Exercice

1. Installe Python et crée un environnement virtuel.
2. Fais tourner les trois scripts sur ton ordinateur (adapte les chemins).
3. Ajoute à `surveille.py` une ligne qui écrit le résultat dans `surveille.log` avec la date.
4. Programme `surveille.py` toutes les heures sur ton serveur avec aaPanel.

## Vérifie que tu sais

- À quoi sert un environnement virtuel ?
- Où regardes-tu si une tâche Cron ne fait rien ?
- Pourquoi tester un script de suppression sur une copie ?
