import csv
import re

TEMPLATE = """Bonjour {company},\n\nJe vous écris pour postuler au poste de {title}. \nAvec ma formation hybride en Communication digitale et Webdesign, je suis capable de gérer la communication et la creation ou la gestion de votre site web.\nMa polyvalence me permet de m'adapter rapidement et de créer des contenus visuels impactants, tout en optimisant l'UX/UI.\n\nJe serais ravi(e) de mettre ces compétences au service de votre entreprise.\n\nCordialement,\n[Votre nom]\n"""


def clean_filename(name: str) -> str:
    """Sanitise le nom du fichier pour éviter les caractères spéciaux."""
    return re.sub(r"[^a-zA-Z0-9_-]", "_", name)


def generate_letters(csv_file="offres.csv"):
    with open(csv_file, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            content = TEMPLATE.format(company=row.get("company", ""), title=row.get("title", ""))
            base = clean_filename(row.get("company", "anonyme")) or "entreprise"
            filename = f"lettre_{base}.txt"
            with open(filename, "w", encoding="utf-8") as out:
                out.write(content)
            print(f"Lettre créée : {filename}")


if __name__ == "__main__":
    generate_letters()
