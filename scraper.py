import csv
import html
import logging
from urllib.parse import urljoin, quote_plus

import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
}

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

KEYWORDS = [
    "alternance", "apprentissage", "contrat pro", "webdesign",
    "communication", "UI", "UX", "graphisme", "création visuelle",
    "site web", "digital", "contenu",
]


def _match_keywords(text: str) -> bool:
    """Return True if any keyword is found in text."""
    text = text.lower()
    return any(kw.lower() in text for kw in KEYWORDS)


def fetch(url: str) -> str:
    """Return page content or empty string on error."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        resp.raise_for_status()
        return resp.text
    except requests.RequestException as exc:
        logging.warning("Echec de la requête %s: %s", url, exc)
        return ""


class Job:
    def __init__(self, title: str, company: str, location: str, link: str, snippet: str):
        self.title = title
        self.company = company
        self.location = location
        self.link = link
        self.snippet = snippet

    def as_dict(self):
        return {
            "title": self.title,
            "company": self.company,
            "location": self.location,
            "link": self.link,
            "snippet": self.snippet,
        }


def scrape_indeed(pages: int = 1):
    """Scrape job results from Indeed France."""
    jobs = []
    base_url = "https://fr.indeed.com"
    for page in range(pages):
        start = page * 10
        url = f"{base_url}/jobs?q={quote_plus('alternance')}&start={start}"
        html_data = fetch(url)
        if not html_data:
            continue
        logging.info("Scraping Indeed page %s", page + 1)
        soup = BeautifulSoup(html_data, "html.parser")
        cards = soup.select("a.tapItem")
        for card in cards:
            title_tag = card.select_one("h2 span")
            title = title_tag.get_text(strip=True) if title_tag else ""
            company_tag = card.find("span", class_="companyName")
            company = company_tag.get_text(strip=True) if company_tag else ""
            location_tag = card.find("div", class_="companyLocation")
            location = location_tag.get_text(" ", strip=True) if location_tag else ""
            link = urljoin(base_url, card.get("href", ""))
            snippet_tag = card.find("div", class_="job-snippet")
            snippet = snippet_tag.get_text(" ", strip=True) if snippet_tag else ""
            if _match_keywords(title + " " + snippet):
                jobs.append(Job(title, company, location, link, snippet))
    return jobs


def scrape_wttj(pages: int = 1):
    """Scrape job results from Welcome To The Jungle."""
    jobs = []
    base_url = "https://www.welcometothejungle.com"
    query = quote_plus("alternance")
    for page in range(1, pages + 1):
        url = (
            f"{base_url}/fr/jobs?page={page}&query={query}"
            f"&refinementList%5Bcontract_type_names.fr%5D%5B%5D=Alternance"
        )
        html_data = fetch(url)
        if not html_data:
            continue
        logging.info("Scraping WTTJ page %s", page)
        soup = BeautifulSoup(html_data, "html.parser")
        articles = soup.select("article")
        for art in articles:
            title_tag = art.find("h3")
            title = title_tag.get_text(strip=True) if title_tag else ""
            company_tag = art.find("span", class_="sc-1ojz1mq-0")
            company = company_tag.get_text(strip=True) if company_tag else ""
            location_tag = art.find("div", class_="ais-Hits-item-location")
            location = location_tag.get_text(strip=True) if location_tag else ""
            link_tag = art.find("a", href=True)
            link = urljoin(base_url, link_tag["href"]) if link_tag else ""
            desc_tag = art.find("p")
            snippet = desc_tag.get_text(" ", strip=True) if desc_tag else ""
            if _match_keywords(title + " " + snippet):
                jobs.append(Job(title, company, location, link, snippet))
    return jobs


def save_csv(jobs, filename="offres.csv"):
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["title", "company", "location", "link", "snippet"])
        writer.writeheader()
        for job in jobs:
            writer.writerow(job.as_dict())


def save_html(jobs, filename="offres.html"):
    rows = "\n".join(
        f"<tr><td>{html.escape(j.title)}</td>"
        f"<td>{html.escape(j.company)}</td>"
        f"<td>{html.escape(j.location)}</td>"
        f"<td><a href='{j.link}'>Lien</a></td>"
        f"<td>{html.escape(j.snippet)[:300]}</td></tr>"
        for j in jobs
    )
    html = (
        "<html><head><meta charset='utf-8'><title>Offres</title></head><body>"
        "<table border='1'>"
        "<tr><th>Titre</th><th>Entreprise</th><th>Localisation</th>"
        "<th>Lien</th><th>Description</th></tr>" + rows + "</table></body></html>"
    )
    with open(filename, "w", encoding="utf-8") as f:
        f.write(html)


def main(pages: int = 2):
    indeed_jobs = scrape_indeed(pages=pages)
    wttj_jobs = scrape_wttj(pages=pages)
    jobs = indeed_jobs + wttj_jobs
    save_csv(jobs)
    save_html(jobs)
    print(f"Sauvegardé {len(jobs)} offres dans 'offres.csv' et 'offres.html'")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Scrape des offres d'alternance")
    parser.add_argument("--pages", type=int, default=2, help="Nombre de pages à analyser par site")
    args = parser.parse_args()

    main(pages=args.pages)
