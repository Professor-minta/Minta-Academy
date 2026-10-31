---
numero: 10
titre: Construire et présenter ton projet
phase: Projet final
duree: 1 à 2 semaines
objectif: Assembler tout ce que tu as appris dans une vraie solution en ligne, utile au Mali, et la présenter.
---

## Le défi

Tu as un domaine, un serveur sécurisé, aaPanel, une application Node.js, des scripts Python et une IA locale. Il est temps de tout réunir pour **résoudre un vrai problème** autour de toi.

## 1. Choisir ton problème

Pars de ce que tu connais : ta famille, ton quartier, ton école, le commerce d'un proche. Quelques idées :

| Idée | Ce que ça utilise |
|---|---|
| Assistant d'une école qui répond aux parents | Node.js, Ollama avec un Modelfile, WhatsApp |
| Catalogue d'une boutique avec commande par WhatsApp | site web, Node.js, liens `wa.me` |
| Tableau des prix du marché mis à jour chaque jour | Python, Cron, site web |
| Assistant interne d'une association, hors ligne | Ollama, Open WebUI, documents |
| Prise de rendez-vous pour un cabinet | Node.js, base de données, rappels automatiques |

Écris ton problème en **une phrase** : « Les parents du lycée appellent le secrétariat pour les mêmes questions toute la journée. »

## 2. Ce que ton projet doit contenir

1. **Un dépôt GitHub** propre, avec un `README.md` qui explique le projet et comment l'installer, et **sans aucun secret**.
2. **Une adresse en ligne en HTTPS** sur ton domaine ou un sous-domaine.
3. **Une partie serveur** : Node.js (module 6) ou Python (module 7).
4. **Une partie automatique ou intelligente** : une tâche Cron, ou l'IA locale (modules 8 et 9).
5. **Une sauvegarde** : snapshot du serveur ou script de sauvegarde programmé.

## 3. Planifier

| Étape | Durée conseillée |
|---|---|
| Problème, utilisateurs, schéma sur papier | 1 jour |
| Première version qui marche sur ton ordinateur | 3 jours |
| Mise en ligne sur le serveur, HTTPS | 1 jour |
| Tests avec 3 vraies personnes, corrections | 2 jours |
| README, présentation, répétition | 1 jour |

Fais une Pull Request pour chaque grosse étape (module 2). Ton historique GitHub montre ton travail.

## 4. La liste de sécurité avant la présentation

- [ ] Aucun fichier `.env`, mot de passe ou clé dans le dépôt GitHub
- [ ] HTTPS actif, avec redirection forcée
- [ ] Pare-feu actif, connexion SSH par clé uniquement
- [ ] 2FA sur GitHub, l'hébergeur, le registraire et aaPanel
- [ ] Aucune capture de la présentation ne montre l'IP, le port du panneau ou une clé
- [ ] Une sauvegarde récente existe

## 5. Présenter en 5 minutes

1. **Le problème** (30 secondes) : qui souffre, et comment aujourd'hui ?
2. **Ta solution** (30 secondes) : en une phrase.
3. **La démonstration** (2 minutes) : montre-la en vrai, sur téléphone si possible.
4. **Comment c'est construit** (1 minute) : un schéma simple, domaine → serveur → application → IA.
5. **La suite** (1 minute) : ce que tu ajouterais, combien d'utilisateurs, comment le financer.

Prépare un **plan B** : une vidéo de la démonstration, au cas où internet coupe pendant la présentation.

## 6. Grille d'évaluation

| Critère | Points |
|---|---|
| Le projet résout un vrai problème, clairement expliqué | 4 |
| Il fonctionne en ligne, en HTTPS | 4 |
| Partie serveur et partie automatique ou IA | 4 |
| Sécurité : aucun secret exposé, serveur protégé | 3 |
| Code et README propres sur GitHub | 3 |
| Présentation claire, dans le temps | 2 |
| **Total** | **20** |

## 7. Après la formation

- Ajoute le projet à ton profil GitHub et à ton CV, avec le lien en ligne.
- Propose-le à la structure pour laquelle tu l'as construit.
- Partage ton dépôt avec la communauté Minta Academy : d'autres apprendront de ton code.

## Exercice

1. Écris ton problème en une phrase et dessine le schéma de ta solution.
2. Crée le dépôt GitHub du projet avec un README de départ.
3. Suis le plan, puis coche la liste de sécurité.
4. Présente ton projet en 5 minutes devant la promo ou en vidéo.

## Vérifie que tu sais

- Quelles sont les 5 pièces obligatoires du projet ?
- Pourquoi tester avec de vraies personnes avant de présenter ?
- Quel est ton plan B si internet coupe pendant la démonstration ?
