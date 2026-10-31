---
numero: 8
titre: IA locale avec Ollama et Mande-IA v3
phase: Intelligence artificielle
duree: 3 heures
objectif: Faire tourner une intelligence artificielle sur ta propre machine, sans internet, avec le modèle Mande-IA v3.
---

## Pourquoi une IA locale

Les IA en ligne demandent une connexion, coûtent cher en données et envoient tes textes à l'étranger. Une **IA locale** tourne sur ton ordinateur :

- elle marche **sans internet**, même pendant une coupure de la fibre ;
- tes données **restent chez toi** : idéal pour une école, un cabinet ou une entreprise ;
- elle ne coûte **rien à l'usage**, une fois installée.

**Ollama** est le logiciel qui télécharge et fait tourner ces modèles. **Mande-IA v3** est le modèle préparé par Minta Services pour le Mali.

## 1. Le matériel nécessaire

| | Minimum | Conseillé |
|---|---|---|
| Mémoire (RAM) | 8 Go | 16 Go |
| Espace disque libre | 5 Go | 20 Go |
| Système | Windows 10/11, macOS, Linux | |
| Carte graphique | pas obligatoire | une carte NVIDIA accélère beaucoup |

Le modèle Mande-IA v3 pèse environ **2 Go**. Sans carte graphique il fonctionne, simplement plus lentement.

## 2. Installer Ollama

- **Windows et macOS** : télécharge l'installateur sur [ollama.com/download](https://ollama.com/download) et lance-le.
- **Linux** :

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Vérifie dans PowerShell ou le terminal :

```bash
ollama --version
```

## 3. Lancer Mande-IA v3

```bash
ollama run professor-minta/mande-ia.v3
```

La première fois, Ollama télécharge le modèle (environ 2 Go, à faire avec une bonne connexion). Ensuite, il démarre en quelques secondes, **même sans internet**.

Écris ta question et appuie sur Entrée :

```text
>>> I ni ce ! Explique-moi en trois phrases ce qu'est un serveur VPS.
```

Pour quitter : `/bye`.

Comme toute IA, Mande-IA peut se tromper, surtout en bambara où il apprend encore. Vérifie les informations importantes.

## 4. Les commandes Ollama à connaître

```bash
ollama list                          # modèles installés et leur taille
ollama ps                            # modèles en cours d'utilisation
ollama pull professor-minta/mande-ia.v3   # télécharger ou mettre à jour
ollama show professor-minta/mande-ia.v3   # informations sur le modèle
ollama rm nom-du-modele              # supprimer un modèle pour libérer de la place
```

## 5. Parler au modèle depuis un programme

Ollama ouvre une **API** sur ta machine, à l'adresse `http://localhost:11434`. Tes applications du module 6 peuvent donc utiliser l'IA.

Linux ou macOS :

```bash
curl http://localhost:11434/api/generate -d '{"model": "professor-minta/mande-ia.v3", "prompt": "Donne un proverbe bambara et sa traduction.", "stream": false}'
```

Windows (PowerShell) :

```powershell
Invoke-RestMethod -Uri http://localhost:11434/api/generate -Method Post -ContentType 'application/json' -Body '{"model": "professor-minta/mande-ia.v3", "prompt": "Donne un proverbe bambara et sa traduction.", "stream": false}'
```

Depuis Node.js (module 6) :

```javascript
const reponse = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ model: 'professor-minta/mande-ia.v3', prompt: 'I ni ce !', stream: false })
});
const data = await reponse.json();
console.log(data.response);
```

## 6. Créer ton propre assistant

Un **Modelfile** part de Mande-IA v3 et lui donne une mission précise. Crée un fichier nommé `Modelfile` :

```text
FROM professor-minta/mande-ia.v3
PARAMETER temperature 0.6
SYSTEM """
Tu es l'assistant du lycée de Missira, à Ségou.
Tu réponds aux élèves et aux parents en français simple ou en bambara.
Si tu ne connais pas une information sur le lycée, dis-le et propose d'appeler le secrétariat.
"""
```

Crée et lance ton modèle :

```bash
ollama create assistant-lycee -f Modelfile
ollama run assistant-lycee
```

Pour le partager, crée un compte sur [ollama.com](https://ollama.com), ajoute la clé de ta machine dans ton profil, puis :

```bash
ollama cp assistant-lycee tonnom/assistant-lycee
ollama push tonnom/assistant-lycee
```

C'est ainsi que `professor-minta/mande-ia.v3` a été publié.

## 7. Sécurité

- Par défaut, Ollama n'écoute que **ta propre machine** (`127.0.0.1`). Ne l'ouvre pas sur internet : n'importe qui pourrait utiliser ta machine.
- Pour le réseau d'un bureau, on passe par Open WebUI (module 9), qui gère des comptes et des mots de passe.
- Ne mets pas d'informations confidentielles dans le `SYSTEM` d'un modèle que tu publies.

## Exercice

1. Installe Ollama et lance `professor-minta/mande-ia.v3`.
2. Coupe internet et vérifie que le modèle répond toujours.
3. Appelle l'API avec curl ou PowerShell.
4. Crée un assistant avec un Modelfile pour une structure que tu connais (école, boutique, association).
5. Note dans `notes/module-08.md` la vitesse de réponse sur ta machine et la RAM utilisée (Gestionnaire des tâches ou `htop`).

## Vérifie que tu sais

- Pourquoi une IA locale protège mieux les données d'une entreprise ?
- À quelle adresse se trouve l'API d'Ollama ?
- Que contient un Modelfile ?
