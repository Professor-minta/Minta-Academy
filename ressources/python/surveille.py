import requests

SITES = [
    "https://mintaservices.com",
    "https://ia.mintaservices.com",
]

for url in SITES:
    try:
        reponse = requests.get(url, timeout=15)
        etat = "OK" if reponse.status_code == 200 else f"PROBLÈME ({reponse.status_code})"
    except requests.RequestException as erreur:
        etat = f"INJOIGNABLE ({erreur.__class__.__name__})"
    print(f"{etat:30} {url}")
