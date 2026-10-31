# Minta Academy

**Formation gratuite et ouverte : cloud, serveurs et intelligence artificielle locale.**
Par **Minta Services**, Missira, Ségou, Mali.

La connaissance ne se vend pas : les 10 modules sont gratuits, en français, et libres de copie. Ils vont du nom de domaine jusqu'à une intelligence artificielle qui tourne sur ta propre machine, sans internet, avec le modèle **Mande-IA v3**.

[![Site](https://img.shields.io/badge/Cours_en_ligne-mintaservices.com%2Facademy-14213d?style=flat-square)](https://mintaservices.com/academy/)
[![Mande-IA v3](https://img.shields.io/badge/Ollama-professor--minta%2Fmande--ia.v3-f2b705?style=flat-square)](https://ollama.com/Professor-Minta/Mande-ia.v3)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-+223_77_29_52_59-25D366?style=flat-square&logo=whatsapp&logoColor=white)](https://wa.me/22377295259)

## Essaie Mande-IA v3 tout de suite

Installe [Ollama](https://ollama.com/download), puis :

```bash
ollama run professor-minta/mande-ia.v3
```

Le modèle (environ 2 Go) se télécharge une fois, puis répond sans internet. Pour une interface dans le navigateur, voir le module 9.

## Les 10 modules

| # | Module | Durée |
|---|---|---|
| 1 | [Méthode de travail et sécurité](modules/01-methode-securite.md) | 2 h |
| 2 | [Git et GitHub](modules/02-git-github.md) | 3 h |
| 3 | [Domaines et DNS](modules/03-domaines-dns.md) | 2 h |
| 4 | [Ton serveur VPS sur DigitalOcean](modules/04-serveur-vps.md) | 3 h |
| 5 | [aaPanel, sites web et HTTPS](modules/05-aapanel.md) | 3 h |
| 6 | [Node.js, de ton ordinateur au serveur](modules/06-nodejs.md) | 4 h |
| 7 | [Python et automatisation](modules/07-python-automatisation.md) | 3 h |
| 8 | [IA locale avec Ollama et Mande-IA v3](modules/08-ollama-mande-ia.md) | 3 h |
| 9 | [Open WebUI, une IA hors ligne pour toute l'équipe](modules/09-open-webui.md) | 3 h |
| 10 | [Construire et présenter ton projet](modules/10-projet-final.md) | 1 à 2 semaines |

Chaque module contient la leçon, les commandes à copier, un exercice et des questions pour vérifier que tu as compris.

## Les fichiers prêts à l'emploi

| Dossier | Contenu | Module |
|---|---|---|
| [`ressources/nodejs-starter`](ressources/nodejs-starter) | Application Node.js de départ, avec `.env.example` et `.gitignore` | 6 |
| [`ressources/python`](ressources/python) | Scripts de sauvegarde, de surveillance de sites et de calcul sur CSV | 7 |
| [`ressources/ollama`](ressources/ollama) | `Modelfile` d'exemple et scripts pour lancer Open WebUI hors ligne | 8 et 9 |

## Pour les entreprises

Minta Services installe Mande-IA **dans les locaux** des entreprises, écoles et administrations : Ollama, le modèle Mande-IA v3, Open WebUI avec un compte par employé, vos documents et la formation de l'équipe. Tout fonctionne sans internet et les données ne quittent pas vos machines. Le prix est fixé sur devis. Voir [la page Entreprises](https://mintaservices.com/academy/entreprises.html) ou écrire sur [WhatsApp](https://wa.me/22377295259).

## Contribuer

Une erreur, une commande qui a changé, une meilleure explication, une traduction en bambara ? Ouvre une *issue* ou une *Pull Request* (module 2). Les cours sont dans `modules/`, en Markdown.

## Le site web

Le site [mintaservices.com/academy](https://mintaservices.com/academy/) est généré à partir des fichiers `modules/*.md` et `pages/entreprises.md`.

```bash
npm install
npm run build        # régénère le dossier site/
```

Le dossier `site/` est un site statique : aucune base de données, aucun serveur Node.js. Après chaque changement d'un cours, lance `npm run build` et envoie aussi le dossier `site/` sur GitHub.

### Mettre le site en ligne sur aaPanel

1. Dans aaPanel, **Website**, regarde le dossier racine de `mintaservices.com` (souvent `/www/wwwroot/mintaservices.com`).
2. Dans le **Terminal** d'aaPanel :

```bash
cd /www/wwwroot
git clone https://github.com/Professor-minta/Minta-Academy.git minta-academy
ln -s /www/wwwroot/minta-academy/site /www/wwwroot/mintaservices.com/academy
```

3. Ouvre [https://mintaservices.com/academy/](https://mintaservices.com/academy/).
4. Pour que l'ancienne adresse `academy.html` mène au nouveau site, remplace son contenu par :

```html
<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=/academy/"><link rel="canonical" href="/academy/"><a href="/academy/">Minta Academy</a>
```

Mettre à jour le site plus tard :

```bash
cd /www/wwwroot/minta-academy && git pull
```

## Licence

- Les **cours** (`modules/`, `pages/`) sont sous licence [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr) : copie-les, traduis-les, enseigne-les, même dans une formation payante, à condition de citer **Minta Academy, par Minta Services**.
- Le **code** (`ressources/`, `scripts/`, `site/assets/`) est sous licence MIT.

Voir [LICENSE](LICENSE).
