# Scraper d'offres en alternance

Ce projet permet de récupérer automatiquement des offres d'alternance dans les domaines de la communication digitale, du webdesign, du marketing digital ou encore de la création de contenu.

## Pré-requis

- Python 3.9+
- Les dépendances listées dans `requirements.txt`

Installez-les via :

```bash
pip install -r requirements.txt
```

## Utilisation

Vous pouvez aussi utiliser `interface.py` pour tout lancer automatiquement :

```bash
python interface.py --pages 2
```

Lancez le script principal pour récupérer les offres depuis Indeed et Welcome To The Jungle puis générez deux fichiers :

- `offres.csv` : liste des offres
- `offres.html` : tableau consultable dans un navigateur

```bash
python scraper.py --pages 2
```

### Génération des lettres de motivation

Après avoir obtenu `offres.csv`, vous pouvez générer une lettre pour chaque offre :

```bash
python generate_letter.py
```

Chaque lettre est enregistrée dans un fichier `lettre_<entreprise>.txt`.
Les noms de fichiers sont nettoyés pour éviter les caractères spéciaux.

## Structure du projet

- `scraper.py` – récupération et export des offres
- `generate_letter.py` – création de lettres de motivation personnalisées (optionnel)
- `interface.py` – petite interface pour lancer le scraping et la génération de lettres
- `requirements.txt` – dépendances Python

## Avertissement

Les sites ciblés peuvent changer de structure. Le scraping peut donc nécessiter des ajustements réguliers. Une connexion Internet active est requise.

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.
