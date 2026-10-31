---
numero: 9
titre: Open WebUI, une IA hors ligne pour toute l'équipe
phase: Intelligence artificielle
duree: 3 heures
objectif: Donner à Mande-IA une interface de discussion moderne dans le navigateur, utilisable sans internet par toute une équipe.
---

## Ce qu'est Open WebUI

Le terminal, c'est pratique pour toi, pas pour une secrétaire ou un directeur. **Open WebUI** est une interface comme ChatGPT, qui tourne sur ta machine et utilise les modèles d'Ollama. Elle gère les comptes, l'historique des discussions et la lecture de documents.

Avec Ollama, Mande-IA v3 et Open WebUI, une entreprise a son propre assistant IA, **chez elle, sans internet**.

## 1. Ce qu'il faut avant

- Ollama installé et le modèle téléchargé (module 8) :

```bash
ollama pull professor-minta/mande-ia.v3
```

- **Python 3.11 ou 3.12** (pas 3.13). Sur Windows, installe-le depuis [python.org](https://www.python.org/downloads/) en cochant « Add python.exe to PATH ».

## 2. Installer Open WebUI

On crée un environnement dédié (module 7), puis on installe :

Windows (PowerShell) :

```powershell
mkdir $HOME\open-webui; cd $HOME\open-webui
py -3.12 -m venv .venv
.venv\Scripts\Activate.ps1
pip install open-webui
```

Linux ou macOS :

```bash
mkdir ~/open-webui && cd ~/open-webui
python3.12 -m venv .venv
source .venv/bin/activate
pip install open-webui
```

L'installation télécharge beaucoup de fichiers : fais-la avec une bonne connexion, une seule fois.

## 3. Lancer Open WebUI

```bash
open-webui serve
```

Ouvre **[http://localhost:8080](http://localhost:8080)** dans Chrome.

1. Le **premier compte créé devient administrateur**. Il est enregistré sur ta machine, pas sur internet.
2. En haut de l'écran, choisis le modèle **professor-minta/mande-ia.v3**.
3. Pose ta question : la réponse vient de ton ordinateur.

Pour les prochaines fois : active l'environnement (`.venv\Scripts\Activate.ps1` ou `source .venv/bin/activate`), puis `open-webui serve`, et ouvre Chrome.

## 4. Travailler sans internet

Une fois tout installé, Open WebUI fonctionne hors ligne. Pour l'empêcher d'essayer de se connecter (vérification des mises à jour, téléchargements), lance-le en mode hors ligne :

Windows (PowerShell) :

```powershell
$env:OFFLINE_MODE = "true"
open-webui serve
```

Linux ou macOS :

```bash
OFFLINE_MODE=true open-webui serve
```

## 5. Utiliser tes documents

Dans une discussion, clique sur **+** pour joindre un PDF ou un fichier texte : Mande-IA répond à partir de son contenu. Dans **Workspace → Knowledge**, tu peux créer une base de documents (règlement intérieur, catalogue, procédures) que toute l'équipe interroge.

## 6. Toute l'équipe sur le même réseau

Open WebUI écoute aussi le réseau local. Sur le même Wi-Fi ou réseau de bureau, tes collègues ouvrent :

```text
http://ADRESSE-DU-PC:8080
```

Pour connaître l'adresse du PC : `ipconfig` sur Windows (ligne « Adresse IPv4 »), `ip addr` sur Linux. Sur Windows, autorise Python dans le pare-feu **pour les réseaux privés uniquement**.

Côté administrateur, dans **Admin Panel → Users** :

- chaque nouveau compte attend ton **approbation** avant de pouvoir discuter ;
- tu peux désactiver les inscriptions quand toute l'équipe a son compte ;
- tu choisis quels modèles chaque groupe peut utiliser.

## 7. Avec Docker (pour un serveur)

Sur un serveur où Docker est installé, une seule commande suffit :

```bash
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data -e WEBUI_SECRET_KEY=une-cle-longue --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

Remplace `une-cle-longue` par le résultat de `openssl rand -hex 32`. L'interface est alors sur le port 3000. Ollama doit écouter `0.0.0.0` pour que le conteneur le trouve.

## 8. Sécurité

- **Ne mets pas Open WebUI sur internet** sans HTTPS, mots de passe solides et inscriptions fermées.
- Garde-le sur le réseau du bureau : c'est tout l'intérêt d'une IA souveraine.
- Fais une copie du dossier de données d'Open WebUI pour sauvegarder les comptes et les discussions.

## Le pack Mande-IA pour les entreprises

Minta Services installe tout cela dans les entreprises, écoles et administrations : Ollama, Mande-IA v3, Open WebUI, les comptes de l'équipe, les documents de la structure et une formation du personnel. Les données ne quittent jamais les locaux. Voir la page **Entreprises** du site de Minta Academy.

## Exercice

1. Installe Open WebUI et connecte-toi avec ton compte administrateur.
2. Discute avec `professor-minta/mande-ia.v3`, puis coupe internet et recommence.
3. Joins un PDF à une discussion et pose des questions sur son contenu.
4. Ouvre Open WebUI depuis ton téléphone, sur le même Wi-Fi, et approuve ce nouveau compte.
5. Note dans `notes/module-09.md` les étapes pour installer l'ensemble dans un bureau de 5 personnes.

## Vérifie que tu sais

- Quel compte devient administrateur ?
- Comment un collègue accède-t-il à Open WebUI depuis son poste ?
- Pourquoi ne pas mettre Open WebUI directement sur internet ?
