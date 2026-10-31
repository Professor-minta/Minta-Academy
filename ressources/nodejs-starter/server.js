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
