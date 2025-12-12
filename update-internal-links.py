#!/usr/bin/env python3
"""
Update internal links in all articles based on silo structure
"""

import os
import re
from pathlib import Path
from collections import defaultdict

def extract_frontmatter(content):
    """Extract YAML frontmatter"""
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if not match:
        return None, content
    return match.group(1), match.group(2)

def extract_metadata(frontmatter):
    """Extract metadata from frontmatter"""
    title_match = re.search(r"title:\s*['\"]?([^'\"]+)['\"]?", frontmatter)
    category_match = re.search(r"category:\s*['\"]?([^'\"]+)['\"]?", frontmatter)
    slug_match = re.search(r"slug:\s*['\"]?([^'\"]+)['\"]?", frontmatter)

    # Extract keywords
    keywords_match = re.search(r'keywords:\s*\n((?:\s+-.*\n)+)', frontmatter)
    keywords = []
    if keywords_match:
        keywords_text = keywords_match.group(1)
        keywords = [k.strip().strip('"').strip("'") for k in re.findall(r'-\s+([^\n]+)', keywords_text)]

    return {
        'title': title_match.group(1) if title_match else None,
        'category': category_match.group(1) if category_match else 'allgemein',
        'slug': slug_match.group(1) if slug_match else None,
        'keywords': keywords,
        'main_keyword': keywords[0] if keywords else None
    }

def analyze_all_articles(articles_dir):
    """Analyze all articles and extract metadata"""
    articles = []

    for article_file in sorted(articles_dir.glob('*.md')):
        with open(article_file, 'r', encoding='utf-8') as f:
            content = f.read()

        frontmatter, body = extract_frontmatter(content)
        if not frontmatter:
            continue

        metadata = extract_metadata(frontmatter)
        metadata['filename'] = article_file.name
        metadata['filepath'] = article_file

        articles.append(metadata)

    return articles

def group_by_silo(articles):
    """Group articles by silo/category"""
    silos = defaultdict(list)
    for article in articles:
        silos[article['category']].append(article)
    return silos

def find_related_articles(article, all_articles, silos, max_same_silo=3, max_cross_silo=2):
    """Find related articles for internal linking"""
    same_silo = []
    cross_silo = []

    # Same silo articles (exclude self)
    silo_articles = [a for a in silos[article['category']] if a['filename'] != article['filename']]
    same_silo = silo_articles[:max_same_silo]

    # Cross-silo articles (from different categories)
    other_articles = [a for a in all_articles if a['category'] != article['category']]

    # Prioritize related topics
    related_categories = {
        'selbststaendig-machen-gruendung': ['steuern', 'versicherungen', 'buchhaltung-und-finanzen'],
        'steuern': ['buchhaltung-und-finanzen', 'selbststaendig-machen-gruendung'],
        'versicherungen': ['selbststaendig-machen-gruendung', 'steuern'],
        'buchhaltung-und-finanzen': ['steuern', 'tools-und-software'],
        'marketing-und-kundenakquise': ['tools-und-software', 'berufsratgeber'],
        'tools-und-software': ['buchhaltung-und-finanzen', 'marketing-und-kundenakquise'],
        'berufsratgeber': ['selbststaendig-machen-gruendung', 'marketing-und-kundenakquise'],
        'einkommen-und-geschaeftsmodelle': ['berufsratgeber', 'marketing-und-kundenakquise'],
    }

    priority_categories = related_categories.get(article['category'], [])

    # First add articles from priority categories
    for cat in priority_categories:
        for a in silos.get(cat, []):
            if len(cross_silo) >= max_cross_silo:
                break
            cross_silo.append(a)
        if len(cross_silo) >= max_cross_silo:
            break

    # Fill remaining with any other articles
    if len(cross_silo) < max_cross_silo:
        for a in other_articles:
            if a not in cross_silo:
                cross_silo.append(a)
                if len(cross_silo) >= max_cross_silo:
                    break

    return same_silo, cross_silo

def create_links_section(same_silo, cross_silo):
    """Create the 'Weiterführende Artikel' section"""
    lines = ['\n## Weiterführende Artikel\n']

    if same_silo:
        for article in same_silo:
            lines.append(f"- [{article['title']}](/artikel/{article['slug']})")

    if cross_silo:
        for article in cross_silo:
            lines.append(f"- [{article['title']}](/artikel/{article['slug']})")

    return '\n'.join(lines) + '\n'

def update_article_links(filepath, same_silo, cross_silo):
    """Update internal links in an article"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove existing "Weiterführende Artikel" section if it exists
    content = re.sub(
        r'\n## Weiterführende Artikel\n.*?(?=\n##|\Z)',
        '',
        content,
        flags=re.DOTALL
    )

    # Add new section before the last ## (usually FAQ or Fazit)
    new_section = create_links_section(same_silo, cross_silo)

    # Find the position to insert (before FAQ or at the end)
    faq_match = re.search(r'\n## (FAQ|Häufig gestellte Fragen|Fazit)', content)

    if faq_match:
        # Insert before FAQ/Fazit
        insert_pos = faq_match.start()
        content = content[:insert_pos] + new_section + content[insert_pos:]
    else:
        # Append at the end
        content = content.rstrip() + '\n' + new_section

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    return True

def main():
    articles_dir = Path('/Users/romanstalder/Dropbox/JETZT/01 CODE/selbstaendig-schweiz/content/articles')

    print("\n" + "="*80)
    print("INTERNAL LINKS UPDATE")
    print("="*80 + "\n")

    # Step 1: Analyze all articles
    print("📊 Step 1: Analyzing all articles...")
    articles = analyze_all_articles(articles_dir)
    print(f"   Found {len(articles)} articles\n")

    # Step 2: Create silo structure
    print("🗂️  Step 2: Creating silo structure...")
    silos = group_by_silo(articles)
    for silo_name, silo_articles in silos.items():
        print(f"   {silo_name}: {len(silo_articles)} articles")
    print()

    # Step 3: Update links for each article
    print("🔗 Step 3: Updating internal links...\n")
    updated_count = 0

    for article in articles:
        same_silo, cross_silo = find_related_articles(article, articles, silos)

        print(f"Processing: {article['filename']}")
        print(f"  Category: {article['category']}")
        print(f"  Same-silo links ({len(same_silo)}): {', '.join([a['slug'] for a in same_silo])}")
        print(f"  Cross-silo links ({len(cross_silo)}): {', '.join([a['slug'] for a in cross_silo])}")

        if update_article_links(article['filepath'], same_silo, cross_silo):
            updated_count += 1
            print(f"  ✅ Updated")
        else:
            print(f"  ⚠️  Failed")
        print()

    # Step 4: Summary
    print("="*80)
    print(f"SUMMARY: {updated_count}/{len(articles)} articles updated with internal links")
    print("="*80)
    print("\n✅ Internal links updated successfully!")
    print("📝 Next step: Review changes and commit manually\n")

if __name__ == '__main__':
    main()
