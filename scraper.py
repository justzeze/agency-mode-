import requests

def fetch_url(url):
    """Récupère le contenu HTML d'une URL."""
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text
    except requests.RequestException as exc:
        print(f"Erreur lors de la requête vers {url}: {exc}")
        return None

if __name__ == "__main__":
    import sys

    if len(sys.argv) != 2:
        print("Usage: python scraper.py <url>")
        sys.exit(1)

    content = fetch_url(sys.argv[1])
    if content is not None:
        print(f"Contenu récupéré (longueur: {len(content)} octets)")
