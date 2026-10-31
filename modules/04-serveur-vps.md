---
numero: 4
titre: Ton serveur VPS sur DigitalOcean
phase: Infrastructure
duree: 3 heures
objectif: Créer un serveur Linux dans le cloud, t'y connecter avec ta clé SSH et le sécuriser.
---

## Ce qu'est un VPS

Un **VPS** (serveur privé virtuel) est un ordinateur Linux qui tourne jour et nuit dans un centre de données, avec une adresse IP publique. C'est là que vivront ton site, ton application et ton API. Mande-IA tourne sur un VPS DigitalOcean.

## 1. Créer le serveur (Droplet)

1. Crée un compte sur [digitalocean.com](https://www.digitalocean.com) et active la 2FA.
2. Clique sur **Create → Droplets**.
3. **Région** : choisis la plus proche de tes utilisateurs, Francfort, Londres ou Amsterdam pour l'Afrique de l'Ouest.
4. **Système** : Ubuntu, la dernière version **LTS** (support long).
5. **Taille** : au moins **1 Go de RAM** pour aaPanel et un site. Pour faire tourner une IA locale sur le serveur, il faut beaucoup plus (8 Go ou plus).
6. **Authentification** : choisis **SSH Key** et colle ta clé publique du module 1. Évite le mot de passe.
7. Donne un nom clair (`minta-prod`) et crée le Droplet. Note son **adresse IP**.

## 2. Première connexion

```bash
ssh root@ADRESSE_IP
```

À la première connexion, tape `yes` pour accepter l'empreinte du serveur. Tu es maintenant aux commandes d'un serveur Linux.

Mets tout à jour :

```bash
apt update && apt upgrade -y
```

## 3. Créer ton utilisateur

Travailler toujours en `root` est dangereux : une faute de frappe peut tout effacer. Crée ton utilisateur avec les droits d'administration :

```bash
adduser minta
usermod -aG sudo minta
rsync --archive --chown=minta:minta ~/.ssh /home/minta
```

Ouvre un **deuxième terminal** et vérifie que tu peux entrer : `ssh minta@ADRESSE_IP`. Garde le premier ouvert tant que ce n'est pas confirmé.

## 4. Le pare-feu

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

Ports 80 et 443 : le web (HTTP et HTTPS). Chaque nouveau service qui doit être joignable (par exemple le port du panneau aaPanel) devra être ouvert ici.

## 5. Interdire la connexion par mot de passe

Les robots essaient des milliers de mots de passe par jour sur chaque serveur. Avec les clés SSH, on peut fermer cette porte :

```bash
sudo nano /etc/ssh/sshd_config
```

Mets ces deux lignes (enlève le `#` devant si besoin) :

```text
PasswordAuthentication no
PermitRootLogin prohibit-password
```

Enregistre (Ctrl+O, Entrée, Ctrl+X) puis redémarre SSH :

```bash
sudo systemctl restart ssh
```

Sur certaines images Ubuntu, un fichier du dossier `/etc/ssh/sshd_config.d/` remet `PasswordAuthentication yes` et passe avant ton réglage. Vérifie le réglage réellement appliqué :

```bash
sudo sshd -T | grep -i passwordauthentication
```

La réponse doit être `passwordauthentication no`. Sinon, ouvre les fichiers de `/etc/ssh/sshd_config.d/`, mets la même ligne à `no`, et redémarre SSH.

Teste une nouvelle connexion **avant** de fermer ta session actuelle.

## 6. Les mises à jour de sécurité automatiques

```bash
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

## 7. Surveiller ton serveur

```bash
df -h          # espace disque
free -h        # mémoire
htop           # processus (q pour quitter)
uptime         # depuis quand le serveur tourne
```

## 8. Les sauvegardes

Dans DigitalOcean, active les **Backups** ou fais un **Snapshot** avant chaque gros changement. Un snapshot coûte un peu chaque mois : supprime les anciens dont tu n'as plus besoin.

## Ne fais jamais ça

- **Mettre à niveau tout le système** (`do-release-upgrade`) sur un serveur en production sans snapshot ni plan de retour.
- **Partager une capture** qui montre l'adresse IP et le port du panneau d'administration.
- **Désactiver le pare-feu** « pour voir si ça marche » et oublier de le réactiver.

## Exercice

1. Crée un Droplet Ubuntu LTS avec ta clé SSH.
2. Crée l'utilisateur `minta`, active le pare-feu et interdis les mots de passe.
3. Vérifie que tu peux te connecter avec `ssh minta@ADRESSE_IP`.
4. Fais un snapshot nommé `base-securisee`.
5. Note les étapes et les problèmes rencontrés dans `notes/module-04.md`, **sans l'adresse IP**.

## Vérifie que tu sais

- Pourquoi créer un utilisateur au lieu de rester en `root` ?
- Que se passe-t-il si tu actives le pare-feu sans autoriser OpenSSH ?
- Dans quel ordre tester un changement de configuration SSH ?
