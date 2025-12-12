#!/usr/bin/env python3
"""
Aktualisiert interne Links in allen Artikeln
"""
import os
import re
from pathlib import Path
from collections import defaultdict

def extract_frontmatter(content):
    """Extrahiert Frontmatter aus Markdown-Datei"""
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if match:
        return match.group(1)
    return None

def parse_frontmatter(frontmatter):
    """Parsed YAML-ähnliches Frontmatter"""
    data = {}
    lines = frontmatter.split('\n')
    current_key = None

    for line in lines:
        # Check for key: value
        if ':' in line and not line.startswith(' ') and not line.startswith('-'):
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            data[key] = value
            current_key = key
        elif line.strip().startswith('-') and current_key:
            # Array value
            value = line.strip().lstrip('-').strip().strip('"').strip("'")
            if current_key not in data:
                data[current_key] = []
            elif not isinstance(data[current_key], list):
                data[current_key] = [data[current_key]]
            if value:
                data[current_key].append(value)

    return data

def main():
    articles_dir = Path('content/articles')
    articles = []

    for file_path in sorted(articles_dir.glob('*.md')):
        try:
            content = file_path.read_text(encoding='utf-8')
            frontmatter_text = extract_frontmatter(content)

            if frontmatter_text:
                data = parse_frontmatter(frontmatter_text)

                slug = data.get('slug', file_path.stem)
                title = data.get('title', '')
                category = data.get('category', 'unbekannt')

                # Keywords auslesen
                keywords = data.get('keywords', [])
                if isinstance(keywords, str):
                    keywords = [keywords]

                keyword = keywords[0] if keywords else slug

                articles.append({
                    'file': file_path.name,
                    'slug': slug,
                    'title': title,
                    'category': category,
                    'keyword': keyword
                })

                print(f"✓ {file_path.name}")
        except Exception as e:
            print(f"✗ {file_path.name}: {e}")

    print(f"\n\n{'='*80}")
    print(f"ÜBERSICHT: {len(articles)} Artikel gefunden")
    print('='*80)

    # Gruppiere nach Kategorie
    by_category = {}
    for article in articles:
        cat = article['category']
        if cat not in by_category:
            by_category[cat] = []
        by_category[cat].append(article)

    # Ausgabe nach Silo
    for category in sorted(by_category.keys()):
        print(f"\n## {category.upper()} ({len(by_category[category])} Artikel)")
        print('-' * 80)
        for article in by_category[category]:
            print(f"  • {article['slug']:50s} | {article['title'][:60]}")

    # CSV-Export für weitere Verarbeitung
    print(f"\n\n{'='*80}")
    print("CSV-Export:")
    print('='*80)
    print("slug,title,category,keyword,file")
    for article in articles:
        print(f"{article['slug']},{article['title']},{article['category']},{article['keyword']},{article['file']}")

if __name__ == '__main__':
    main()
