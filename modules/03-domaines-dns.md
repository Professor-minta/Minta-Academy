---
numero: 3
titre: Domaines et DNS
phase: Infrastructure
duree: 2 heures
objectif: Choisir un nom de domaine, l'acheter en sécurité et le relier à ton serveur.
---

## Ce qu'est un nom de domaine

Les serveurs se trouvent par leur adresse IP, par exemple `203.0.113.10`. Personne ne retient ça. Le **nom de domaine** (`mintaservices.com`) est le nom facile, et le **DNS** est l'annuaire qui traduit le nom en adresse IP.

## 1. Choisir un bon nom

- **Court** et facile à dire au téléphone : on doit pouvoir l'épeler sans erreur.
- **Sans tiret ni chiffre** si possible.
- **La bonne extension** : `.com` pour tout le monde, `.africa` pour un projet africain, `.ml` pour le Mali.
- Vérifie que le même nom est libre sur Facebook, WhatsApp Business et TikTok.

## 2. Acheter le domaine

Les `.com` et `.africa` s'achètent chez un **registraire** comme Namecheap, Cloudflare ou Porkbun, avec une carte bancaire. Pour un `.ml`, adresse-toi à un revendeur agréé pour l'extension malienne.

Au moment de l'achat :

1. **Active la protection de la vie privée** (souvent gratuite, appelée « Withheld for Privacy » chez Namecheap) : ton nom, ton téléphone et ton adresse ne seront pas publics.
2. **Active la 2FA** sur le compte du registraire. Celui qui contrôle ce compte contrôle ton site et tes e-mails.
3. **Active le renouvellement automatique** : un domaine expiré peut être racheté par quelqu'un d'autre.

## 3. Les enregistrements DNS à connaître

| Type | À quoi il sert | Exemple |
|---|---|---|
| **A** | Relie un nom à une adresse IPv4 | `@` → `203.0.113.10` |
| **AAAA** | Pareil, pour une adresse IPv6 | `@` → `2001:db8::10` |
| **CNAME** | Fait d'un nom l'alias d'un autre nom | `www` → `mintaservices.com` |
| **MX** | Indique le serveur qui reçoit les e-mails | `@` → `mail.mintaservices.com` |
| **TXT** | Texte de vérification (Google, Meta, SPF pour les e-mails) | `v=spf1 ...` |

`@` veut dire « le domaine lui-même ». Un **sous-domaine** comme `ia.mintaservices.com` est simplement un enregistrement A nommé `ia`.

Le **TTL** est le temps pendant lequel les autres serveurs gardent l'information en mémoire. Mets 300 secondes (5 minutes) pendant que tu fais des réglages.

## 4. Relier le domaine à ton serveur

Dans le panneau DNS de ton registraire (menu « Advanced DNS » chez Namecheap) :

| Type | Hôte | Valeur |
|---|---|---|
| A | `@` | l'adresse IP de ton VPS (module 4) |
| A | `www` | la même adresse IP |
| A | `ia` | la même adresse IP, si tu veux un sous-domaine |

## 5. Vérifier que ça marche

Les changements prennent de quelques minutes à quelques heures. Vérifie :

```bash
nslookup mondomaine.com
```

Sur Linux ou macOS, tu peux aussi utiliser :

```bash
dig +short mondomaine.com
```

La réponse doit être l'adresse IP de ton serveur. Le site [dnschecker.org](https://dnschecker.org) montre la propagation dans le monde entier.

## Erreurs fréquentes

- **Deux enregistrements A pour le même nom** avec des adresses différentes : le site s'ouvre une fois sur deux.
- **Oublier `www`** : `mondomaine.com` marche, `www.mondomaine.com` non.
- **Changer les serveurs DNS (« nameservers ») par erreur** : tes enregistrements disparaissent. Garde ceux du registraire tant que tu n'as pas de raison de changer.

## Exercice

1. Trouve trois noms possibles pour ton projet final et vérifie qu'ils sont libres.
2. Si tu as un domaine, ajoute un enregistrement A `@` et `www` vers l'adresse IP de ton serveur (tu l'obtiens au module 4).
3. Vérifie avec `nslookup`, puis note le résultat dans `notes/module-03.md`.

## Vérifie que tu sais

- Quelle est la différence entre un enregistrement A et un CNAME ?
- Pourquoi activer la protection de la vie privée et la 2FA chez le registraire ?
- Comment créer le sous-domaine `ia.mondomaine.com` ?
