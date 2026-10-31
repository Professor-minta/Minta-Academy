import shutil
from datetime import datetime
from pathlib import Path

SOURCE = Path("/www/wwwroot/mondomaine.com")
DESTINATION = Path("/www/backup/sites")
A_GARDER = 7

DESTINATION.mkdir(parents=True, exist_ok=True)
nom = DESTINATION / f"site-{datetime.now():%Y-%m-%d}"
shutil.make_archive(str(nom), "zip", SOURCE)
print("Sauvegarde créée :", nom.with_suffix(".zip"))

archives = sorted(DESTINATION.glob("site-*.zip"))
for ancienne in archives[:-A_GARDER]:
    ancienne.unlink()
    print("Supprimée :", ancienne.name)
