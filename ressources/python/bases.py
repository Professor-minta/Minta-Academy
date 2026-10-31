nom = "Awa"
age = 22
villes = ["Bamako", "Ségou", "Sikasso"]

print(f"I ni ce {nom}, tu as {age} ans.")
for ville in villes:
    if ville == "Ségou":
        print(ville, ": la cité des balanzans")
    else:
        print(ville)
