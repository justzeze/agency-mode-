import argparse
from scraper import main as scrape
from generate_letter import generate_letters


def run(pages: int):
    scrape(pages=pages)
    choice = input("\nVoulez-vous générer les lettres maintenant ? (o/n) : ")
    if choice.lower().startswith('o'):
        generate_letters()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Interface de scraping")
    parser.add_argument("--pages", type=int, default=2, help="Nombre de pages à analyser")
    args = parser.parse_args()
    run(pages=args.pages)
