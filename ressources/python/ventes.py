import csv
from collections import defaultdict

totaux = defaultdict(int)
with open("ventes.csv", encoding="utf-8") as fichier:
    for ligne in csv.DictReader(fichier):
        totaux[ligne["produit"]] += int(ligne["quantite"]) * int(ligne["prix"])

for produit, total in sorted(totaux.items(), key=lambda x: -x[1]):
    print(f"{produit:10} {total:>10,} FCFA".replace(",", " "))
print(f"{'TOTAL':10} {sum(totaux.values()):>10,} FCFA".replace(",", " "))
