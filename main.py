import html

sample_jobs = [
    {
        "title": "Développeur Python",
        "link": "https://example.com/python-dev",
        "snippet": "<p>Développer des applications web.</p>",
        "salary": "45k€"
    },
    {
        "title": "Data Scientist",
        "link": "https://example.com/data-scientist",
        "snippet": "<p>Analyse de données et machine learning.</p>",
        "salary": "50k€"
    }
]

def save_html(jobs, output_file="offres.html"):
    """Save job offers to an HTML file."""
    with open(output_file, "w", encoding="utf-8") as f:
        f.write("<html><head><meta charset='utf-8'><title>Offres</title></head><body>\n")
        for j in jobs:
            f.write("<div class='job'>\n")
            f.write(f"  <a href='{html.escape(j['link'])}'><h2>{html.escape(j['title'])}</h2></a>\n")
            snippet = html.escape(j['snippet'][:300])
            f.write(f"  <p>{snippet}</p>\n")
            if j.get('salary'):
                f.write(f"  <p><strong>Salaire:</strong> {html.escape(j['salary'])}</p>\n")
            f.write("</div>\n")
        f.write("</body></html>\n")

if __name__ == "__main__":
    save_html(sample_jobs)
    print("Generated offres.html")
