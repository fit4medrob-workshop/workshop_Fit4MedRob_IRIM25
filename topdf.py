from pathlib import Path
from playwright.sync_api import sync_playwright

# Modifica qui:
html_path = Path("IRIM25_A4_poster.html")
pdf_path = html_path.with_suffix(".pdf")

# Costruisci l'URL file:// (necessario per far risolvere asset relativi come ./assets/...)
file_url = html_path.resolve().as_uri()

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    page.goto(file_url, wait_until="load")  # carica immagini/CSS locali
    # Stampa in A4 includendo background e margini ragionevoli
    page.pdf(
        path=str(pdf_path),
        format="A4",
        print_background=True,
        margin={"top": "0mm", "right": "0mm", "bottom": "0mm", "left": "0mm"},
        scale=0.6  # Scala la pagina per far entrare tutto in un foglio
    )
    browser.close()

print(f"PDF esportato: {pdf_path}")
