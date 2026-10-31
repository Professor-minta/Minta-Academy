---
numero: 5
titre: aaPanel, sites web et HTTPS
phase: Infrastructure
duree: 3 heures
objectif: Installer aaPanel, le sécuriser, mettre un site en ligne avec son certificat HTTPS.
---

## Ce qu'est aaPanel

aaPanel est un panneau d'administration gratuit : il gère depuis ton navigateur les sites, Nginx, les bases de données, les certificats SSL, les tâches planifiées et les applications Node.js. Tout ce que tu fais dans aaPanel, tu pourrais le faire en ligne de commande, mais aaPanel va plus vite et évite beaucoup d'erreurs.

## 1. Installer aaPanel

Connecte-toi à ton serveur en `root`, puis copie la commande d'installation **depuis la page officielle** [aapanel.com/new/download.html](https://www.aapanel.com/new/download.html). Au moment où ce cours est écrit, elle est :

```bash
URL=https://www.aapanel.com/script/install_panel_en.sh && if [ -f /usr/bin/curl ];then curl -ksSO $URL ;else wget --no-check-certificate -O install_panel_en.sh $URL;fi;bash install_panel_en.sh
```

Ne copie jamais une commande d'installation depuis un site inconnu ou une vidéo : elle s'exécute avec tous les droits sur ton serveur.

À la fin, aaPanel affiche une **adresse** (avec un port et un chemin secret), un **nom d'utilisateur** et un **mot de passe**. Copie-les dans ton gestionnaire de mots de passe.

Si tu as activé le pare-feu au module 4, ouvre le port du panneau :

```bash
sudo ufw allow PORT_DU_PANNEAU/tcp
```

## 2. Sécuriser aaPanel dès la première connexion

Dans **Settings** :

1. **Change le nom d'utilisateur et le mot de passe** proposés.
2. **Change le port** du panneau pour un port peu courant, et garde le **chemin de sécurité** (security entrance).
3. **Active l'authentification à deux facteurs** (Google Authenticator).
4. **Active le SSL du panneau** pour que la connexion à aaPanel soit chiffrée.
5. **Ne partage jamais** l'adresse complète du panneau ni une capture qui la montre.

## 3. Installer le serveur web

aaPanel propose d'installer un ensemble de logiciels. Pour ce cours, choisis **LNMP** : **Nginx**, **MySQL** et **PHP**. Prends les versions recommandées et laisse l'installation se terminer (10 à 20 minutes).

## 4. Mettre un site en ligne

1. **Website → Add site**.
2. **Domain** : `mondomaine.com` et `www.mondomaine.com` (le DNS doit déjà pointer vers le serveur, module 3).
3. aaPanel crée le dossier `/www/wwwroot/mondomaine.com`.
4. Ouvre **Files**, va dans ce dossier et remplace `index.html` par ta page :

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mon premier site</title>
</head>
<body>
  <h1>I ni ce !</h1>
  <p>Ce site tourne sur mon propre serveur.</p>
</body>
</html>
```

Ouvre `http://mondomaine.com` : ta page s'affiche.

## 5. Le HTTPS avec Let's Encrypt

1. Dans la liste des sites, clique sur ton site, puis **SSL**.
2. Choisis **Let's Encrypt**, coche les deux domaines, valide.
3. Active **Force HTTPS**.

Le certificat est gratuit et se renouvelle tout seul. Le cadenas apparaît dans le navigateur.

## 6. Les autres outils utiles

- **Databases** : créer une base MySQL et son utilisateur pour une application.
- **Cron** : lancer une tâche à heure fixe (sauvegarde, script Python du module 7).
- **Logs** : comprendre une erreur, avec **Website → Logs** pour un site.
- **Security** : voir les ports ouverts et bloquer une adresse qui attaque.
- **Terminal** : un terminal du serveur directement dans le navigateur.

## Erreurs fréquentes

- **« Site non trouvé » ou page par défaut** : le DNS ne pointe pas encore vers le serveur. Vérifie avec `nslookup`.
- **Let's Encrypt refuse** : le domaine ne pointe pas vers ce serveur, ou le port 80 est fermé.
- **Panneau inaccessible** : le port du panneau n'est pas ouvert dans le pare-feu.

## Exercice

1. Installe aaPanel et applique les 5 réglages de sécurité.
2. Installe LNMP.
3. Mets en ligne une page `index.html` à ton nom sur ton domaine, avec HTTPS.
4. Note dans `notes/module-05.md` ce que fait chaque menu d'aaPanel que tu as utilisé.

## Vérifie que tu sais

- Pourquoi copier la commande d'installation uniquement depuis le site officiel ?
- Quelles sont les deux conditions pour obtenir un certificat Let's Encrypt ?
- Où se trouvent les fichiers de ton site sur le serveur ?
