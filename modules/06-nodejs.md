---
numero: 6
titre: Node.js, de ton ordinateur au serveur
phase: Développement
duree: 4 heures
objectif: Construire une petite application Node.js propre, la mettre sur GitHub puis la faire tourner sur ton serveur avec aaPanel.
---

## Pourquoi Node.js

Node.js fait tourner du JavaScript côté serveur. Avec un seul langage, tu écris la page web et le serveur qui répond. C'est la technologie de Mande-IA : discussion, WhatsApp, paiement, tout passe par un fichier `server.js`.

## 1. Installer Node.js

Télécharge la version **LTS** sur [nodejs.org](https://nodejs.org) et installe-la. Vérifie :

```bash
node --version
npm --version
```

## 2. La structure d'un projet propre

```text
mon-app/
├── server.js        le serveur
├── package.json     nom du projet, dépendances, commande de démarrage
├── public/          les fichiers envoyés au navigateur
│   └── index.html
├── .env             les secrets (jamais sur GitHub)
├── .env.example     la liste des variables, sans les valeurs
└── .gitignore
```

## 3. Créer le projet

```bash
mkdir mon-app && cd mon-app
npm init -y
npm install express dotenv
mkdir public
```

Dans `package.json`, ajoute la commande de démarrage :

```json
"scripts": {
  "start": "node server.js"
}
```

## 4. Le serveur

`server.js` :

```javascript
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/sante', (req, res) => {
  res.json({ ok: true, heure: new Date().toISOString() });
});

app.post('/api/bonjour', (req, res) => {
  const nom = String(req.body?.nom || '').trim().slice(0, 40);
  if (!nom) return res.status(400).json({ erreur: 'Donne ton nom.' });
  res.json({ message: `I ni ce, ${nom} !` });
});

app.listen(PORT, () => console.log(`Mon app écoute sur le port ${PORT}`));
```

`public/index.html` :

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mon app</title>
</head>
<body>
  <h1>Mon app Node.js</h1>
  <form id="f"><input id="nom" placeholder="Ton nom"> <button>Dire bonjour</button></form>
  <p id="r"></p>
  <script>
    document.getElementById('f').onsubmit = async (e) => {
      e.preventDefault();
      const res = await fetch('/api/bonjour', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ nom: document.getElementById('nom').value })
      });
      const data = await res.json();
      document.getElementById('r').textContent = data.message || data.erreur;
    };
  </script>
</body>
</html>
```

`.env` (sur ton ordinateur seulement) et `.env.example` (sur GitHub) :

```text
PORT=3000
```

`.gitignore` :

```text
.env
node_modules/
*.log
```

Lance l'application :

```bash
npm start
```

Ouvre [http://localhost:3000](http://localhost:3000) et teste le formulaire.

## 5. Envoyer le projet sur GitHub

```bash
git init
git add server.js package.json package-lock.json public .env.example .gitignore
git commit -m "Première version de mon app"
git remote add origin git@github.com:TonNom/mon-app.git
git push -u origin main
```

Vérifie sur GitHub que `.env` et `node_modules` **n'y sont pas**.

## 6. Déployer sur le serveur avec aaPanel

**a. Récupérer le code.** Dans le terminal d'aaPanel :

```bash
cd /www/wwwroot
git clone https://github.com/TonNom/mon-app.git
cd mon-app
npm install --omit=dev
```

**b. Créer le fichier `.env` sur le serveur** avec **Files**, puis protège-le :

```bash
chown www:www .env && chmod 600 .env
```

**c. Créer le projet Node.js.** Dans aaPanel : **Website → Node project → Add Node project**

| Réglage | Valeur |
|---|---|
| Path | `/www/wwwroot/mon-app` |
| Run opt | `start` |
| Port | `3000` (le même que dans `.env`) |
| User | `www` |
| Node | la version LTS installée |

**d. Le domaine et le HTTPS.** Dans les réglages du projet, ajoute ton domaine (par exemple `app.mondomaine.com`, avec son enregistrement A du module 3), puis active **SSL → Let's Encrypt**. aaPanel crée lui-même le reverse proxy Nginx vers le port 3000.

**e. Les erreurs.** L'onglet **Project log** montre ce que ton application écrit avec `console.log` et les erreurs.

## 7. Mettre à jour l'application

```bash
cd /www/wwwroot/mon-app && git pull && npm install --omit=dev
```

Puis **Restart** dans aaPanel. C'est la routine utilisée pour Mande-IA.

## Erreurs fréquentes

- **`Cannot find module`** : tu n'es pas dans le bon dossier, ou tu as oublié `npm install`.
- **`EADDRINUSE`** : le port est déjà pris par une autre application. Change de port.
- **502 Bad Gateway** : l'application est arrêtée ou plantée. Regarde le Project log.

## Exercice

1. Crée l'application ci-dessus et teste-la sur ton ordinateur.
2. Ajoute une route `GET /api/proverbe` qui renvoie un proverbe malien au hasard parmi cinq.
3. Envoie le projet sur GitHub, sans `.env`.
4. Déploie-le sur ton serveur avec un sous-domaine en HTTPS.

## Vérifie que tu sais

- À quoi sert `.env.example` ?
- Quelle commande installe les dépendances sur le serveur ?
- Que vérifies-tu en premier quand le site affiche « 502 Bad Gateway » ?
