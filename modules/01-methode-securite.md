---
numero: 1
titre: Méthode de travail et sécurité
phase: Fondations
duree: 2 heures
objectif: Organiser ton ordinateur comme un professionnel et protéger tes comptes avant de toucher à un serveur.
---

## Pourquoi commencer par la méthode

Un serveur mal protégé peut être piraté en quelques heures. Un mot de passe envoyé sur WhatsApp, une clé collée dans un dépôt public ou une capture d'écran qui montre l'adresse de ton panneau d'administration suffisent. Avant d'apprendre la technique, on prend donc de bonnes habitudes. Elles te protégeront pendant toute ta carrière.

## 1. Organiser ton dossier de travail

Crée un seul dossier pour tous tes projets, toujours au même endroit.

```text
minta-academy/
├── notes/          tes notes de cours, un fichier par module
├── projets/        le code de tes projets
├── serveurs/       infos de connexion (sans aucun mot de passe)
└── captures/       captures d'écran, recadrées avant de les partager
```

Sur Windows, ouvre **PowerShell** et tape :

```powershell
mkdir $HOME\minta-academy\notes, $HOME\minta-academy\projets, $HOME\minta-academy\serveurs, $HOME\minta-academy\captures
```

Sur Linux ou macOS :

```bash
mkdir -p ~/minta-academy/{notes,projets,serveurs,captures}
```

## 2. Les mots de passe

- **Un mot de passe différent pour chaque compte.** Si un site est piraté, les autres restent protégés.
- **Long plutôt que compliqué** : une phrase de 4 ou 5 mots, par exemple `mangue-pirogue-Segou-fleuve-2026`, est plus solide et plus facile à retenir que `P@ss1`.
- **Un gestionnaire de mots de passe** retient tout à ta place. Bitwarden est gratuit et fonctionne sur téléphone et ordinateur.

## 3. La double authentification (2FA)

Avec la 2FA, un pirate qui vole ton mot de passe ne peut toujours pas entrer : il lui manque le code à 6 chiffres de ton téléphone.

1. Installe **Google Authenticator**, **Microsoft Authenticator** ou **Aegis** (Android) sur ton téléphone.
2. Active la 2FA partout où c'est possible : e-mail, GitHub, DigitalOcean, registraire de domaine, aaPanel.
3. Garde les **codes de secours** sur papier, dans un endroit sûr. Sans eux, si tu perds ton téléphone, tu perds tes comptes.

## 4. Les clés SSH

Une clé SSH remplace le mot de passe pour te connecter à un serveur ou à GitHub. Elle est en deux parties :

- la **clé privée** reste sur ton ordinateur et ne se partage **jamais** ;
- la **clé publique** (le fichier qui finit par `.pub`) se donne sans risque.

Crée ta clé (Windows 10 et 11, Linux et macOS ont déjà la commande) :

```bash
ssh-keygen -t ed25519 -C "ton-email@exemple.com"
```

Appuie sur Entrée pour l'emplacement proposé, puis choisis une phrase de passe. Affiche ensuite ta clé publique :

```bash
cat ~/.ssh/id_ed25519.pub
```

Sur Windows, la clé est dans `C:\Users\TonNom\.ssh\`.

## 5. Les 5 règles absolues

1. **Les clés et mots de passe ne vont jamais dans un message**, ni WhatsApp, ni e-mail, ni chat avec une IA.
2. **Les fichiers `.env` ne vont jamais sur GitHub.** On les ajoute au fichier `.gitignore` (module 2).
3. **On recadre les captures d'écran** avant de les partager : pas d'adresse IP, pas de port de panneau, pas de lien de session, pas de clé.
4. **Une clé exposée est une clé perdue.** Si elle a été montrée, on la remplace tout de suite, même si « personne ne l'a vue ».
5. **On sauvegarde avant de modifier.** Un instantané (snapshot) du serveur ou une copie du fichier avant chaque changement important.

## 6. Reconnaître une arnaque

- Un message urgent qui demande un code reçu par SMS : c'est **toujours** une arnaque.
- Un lien qui ressemble à un vrai site (`githuub.com`, `digita1ocean.com`) : regarde l'adresse lettre par lettre.
- Un « support technique » qui te contacte en premier : les vrais services ne demandent jamais ton mot de passe.

## Exercice

1. Crée ton dossier `minta-academy` avec ses 4 sous-dossiers.
2. Installe un gestionnaire de mots de passe et une application 2FA.
3. Active la 2FA sur ton adresse e-mail principale.
4. Crée ta clé SSH et affiche ta clé publique.
5. Dans `notes/module-01.md`, écris les 5 règles absolues avec tes propres mots.

## Vérifie que tu sais

- Quelle partie de ta clé SSH peux-tu donner, et laquelle jamais ?
- Que fais-tu si tu as collé une clé d'API dans un groupe WhatsApp par erreur ?
- Pourquoi garder les codes de secours de la 2FA sur papier ?
