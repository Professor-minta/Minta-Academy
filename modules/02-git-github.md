---
numero: 2
titre: Git et GitHub
phase: Fondations
duree: 3 heures
objectif: Suivre chaque changement de ton code, le sauvegarder sur GitHub et travailler à plusieurs sans rien casser.
---

## Pourquoi Git

Sans Git, on finit avec `site-final.html`, `site-final-v2.html` et `site-VRAI-final.html`. Git garde l'historique de chaque modification : tu peux revenir en arrière, voir qui a changé quoi et travailler à plusieurs sur le même projet. **GitHub** garde une copie de cet historique en ligne et permet de partager ton code.

## 1. Installer Git

- **Windows** : télécharge Git sur [git-scm.com](https://git-scm.com), installe-le avec les options proposées, puis ouvre **Git Bash** ou PowerShell.
- **Ubuntu / Debian** : `sudo apt update && sudo apt install -y git`
- **macOS** : tape `git --version`, macOS propose de l'installer.

Présente-toi à Git (une seule fois par ordinateur) :

```bash
git config --global user.name "Ton Nom"
git config --global user.email "ton-email@exemple.com"
git config --global init.defaultBranch main
```

## 2. Les 4 commandes de tous les jours

```bash
git status                  # qu'est-ce qui a changé ?
git add index.html          # préparer un fichier pour la sauvegarde
git commit -m "Ajoute la page d'accueil"   # sauvegarder avec un message clair
git log --oneline           # voir l'historique
```

Un bon message de commit dit **ce que fait le changement** : « Corrige le menu sur téléphone », pas « modif » ou « update ».

## 3. Le fichier .gitignore

Il dit à Git quels fichiers ne **jamais** envoyer. Crée-le dès le début de chaque projet :

```text
.env
node_modules/
__pycache__/
*.log
.DS_Store
```

Vérifie avant chaque commit avec `git status` : si `.env` apparaît, arrête-toi. N'utilise pas `git add .` sans avoir regardé la liste.

## 4. Créer ton compte GitHub et le sécuriser

1. Crée ton compte sur [github.com](https://github.com).
2. Active la 2FA : **Settings → Password and authentication → Two-factor authentication**.
3. Ajoute ta clé SSH du module 1 : **Settings → SSH and GPG keys → New SSH key**, colle le contenu de `id_ed25519.pub`.
4. Teste la connexion :

```bash
ssh -T git@github.com
```

GitHub répond « Hi TonNom! You've successfully authenticated ».

## 5. Envoyer un projet sur GitHub

Sur GitHub, clique sur **New repository**, donne-lui un nom (par exemple `minta-academy-notes`), laisse-le vide, puis :

```bash
cd ~/minta-academy/notes
git init
git add module-01.md .gitignore
git commit -m "Notes du module 1"
git remote add origin git@github.com:TonNom/minta-academy-notes.git
git push -u origin main
```

Ensuite, pour chaque nouveau travail : `git add`, `git commit`, `git push`.

## 6. Travailler en équipe : branches et Pull Requests

Une **branche** est une copie de travail. On y fait ses changements sans toucher à `main`, la version qui tourne en production.

```bash
git switch -c nouvelle-page     # créer une branche et y aller
# ... modifications ...
git add page.html
git commit -m "Ajoute la page Contact"
git push -u origin nouvelle-page
```

Sur GitHub, un bouton **Compare & pull request** apparaît. La **Pull Request** (PR) montre les changements : on relit, on discute, puis on clique sur **Merge**. C'est exactement comme ça que Mande-IA est développé.

Sur le serveur, on récupère ensuite la nouvelle version :

```bash
git pull
```

## 7. Réparer une erreur

```bash
git restore fichier.html        # annuler les changements non sauvegardés d'un fichier
git restore --staged .env       # retirer un fichier ajouté par erreur avant le commit
```

Si une clé est déjà partie sur GitHub, la supprimer du fichier ne suffit pas : elle reste dans l'historique. **Change la clé** chez le service concerné (règle 4 du module 1).

## Exercice

1. Installe Git et configure ton nom et ton e-mail.
2. Crée le dépôt `minta-academy-notes` sur GitHub, en privé.
3. Envoie-y ton fichier `module-01.md` avec un `.gitignore`.
4. Crée une branche `module-02`, ajoute `module-02.md`, ouvre une Pull Request et fusionne-la.

## Vérifie que tu sais

- Quelle commande te montre les fichiers modifiés ?
- Pourquoi travailler dans une branche plutôt que directement sur `main` ?
- Que fais-tu si `.env` apparaît dans `git status` ?
