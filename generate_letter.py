import csv

TEMPLATE = """Bonjour {company},\n\nJe vous écris pour postuler au poste de {title}. \nAvec ma formation hybride en Communication digitale et Webdesign, je suis capable de gérer la communication et la creation ou la gestion de votre site web.\nMa polyvalence me permet de m'adapter rapidement et de créer des contenus visuels impactants, tout en optimisant l'UX/UI.\n\nJe serais ravi(e) de mettre ces compétences au service de votre entreprise.\n\nCordialement,\n[Votre nom]\n"""


def generate_letters(csv_file="offres.csv"):
    with open(csv_file, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            content = TEMPLATE.format(company=row.get("company", ""), title=row.get("title", ""))
            filename = f"lettre_{row.get('company','').replace(' ', '_')}.txt"
            with open(filename, "w", encoding="utf-8") as out:
                out.write(content)
            print(f"Lettre créée : {filename}")


if __name__ == "__main__":
    generate_letters()
