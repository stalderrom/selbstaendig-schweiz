#!/usr/bin/env python3
"""
Robust internal links updater using PyYAML
"""

import yaml
import re
from pathlib import Path
from collections import defaultdict

def parse_article(filepath):
    """Parse article with proper YAML parsing"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split frontmatter and body
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if not match:
        return None

    frontmatter_text = match.group(1)
    body = match.group(2)

    # Parse YAML
    try:
        frontmatter = yaml.safe_load(frontmatter_text)
    except:
        return None

    return {
        'frontmatter': frontmatter,
        'frontmatter_text': frontmatter_text,
        'body': body,
        'full_content': content,
        'filepath': filepath
    }

def analyze_articles(articles_dir):
    """Analyze all articles"""
    articles = []

    for filepath in sorted(articles_dir.glob('*.md')):
        parsed = parse_article(filepath)
        if not parsed:
            continue

        fm = parsed['frontmatter']

        article = {
            'filename': filepath.name,
            'filepath': filepath,
            'title': fm.get('title', ''),
            'slug': fm.get('slug', ''),
            'category': fm.get('category', 'allgemein'),
            'keywords': fm.get('keywords', []),
            'main_keyword': fm.get('keywords', [''])[0] if fm.get('keywords') else '',
            'frontmatter': parsed['frontmatter'],
            'frontmatter_text': parsed['frontmatter_text'],
            'body': parsed['body']
        }

        articles.append(article)

    return articles

def group_by_silo(articles):
    """Group articles by category"""
    silos = defaultdict(list)
    for article in articles:
        silos[article['category']].append(article)
    return silos

def find_related_articles(article, all_articles, silos):
    """Find related articles"""
    same_silo = []
    cross_silo = []

    # Same silo (max 3)
    silo_articles = [a for a in silos[article['category']] if a['filename'] != article['filename']]
    same_silo = silo_articles[:3]

    # Related categories for cross-silo linking
    related_cats = {
        'selbststaendig-machen-gruendung': ['steuern', 'versicherungen', 'buchhaltung-&-finanzen'],
        'selbständig-machen-/-gründung': ['steuern', 'versicherungen', 'buchhaltung-&-finanzen'],
        'steuern': ['buchhaltung-&-finanzen', 'versicherungen'],
        'versicherungen': ['steuern', 'buchhaltung-&-finanzen'],
        'buchhaltung-&-finanzen': ['steuern', 'tools-&-software'],
        'buchhaltung-und-finanzen': ['steuern', 'tools-&-software'],
        'marketing-und-kundenakquise': ['tools-&-software', 'berufsratgeber'],
        'marketing-&-kundenakquise': ['tools-&-software', 'berufsratgeber'],
        'tools-&-software': ['buchhaltung-&-finanzen', 'marketing-&-kundenakquise'],
        'tools-und-software': ['buchhaltung-&-finanzen', 'marketing-&-kundenakquise'],
        'berufsratgeber': ['selbststaendig-machen-gruendung', 'marketing-&-kundenakquise'],
        'einkommen-und-geschaeftsmodelle': ['berufsratgeber', 'marketing-&-kundenakquise'],
        'einkommen-&-geschäftsmodelle': ['berufsratgeber', 'marketing-&-kundenakquise'],
    }

    priority_cats = related_cats.get(article['category'], [])

    # Add cross-silo from priority categories
    for cat in priority_cats:
        for a in silos.get(cat, []):
            if len(cross_silo) >= 2:
                break
            cross_silo.append(a)
        if len(cross_silo) >= 2:
            break

    # Fill up with any other articles
    if len(cross_silo) < 2:
        for a in all_articles:
            if a['category'] != article['category'] and a not in cross_silo:
                cross_silo.append(a)
                if len(cross_silo) >= 2:
                    break

    return same_silo, cross_silo

def create_links_section(same_silo, cross_silo):
    """Create markdown links section"""
    lines = []

    for a in same_silo:
        lines.append(f"- [{a['title']}](/artikel/{a['slug']})")

    for a in cross_silo:
        lines.append(f"- [{a['title']}](/artikel/{a['slug']})")

    return '\n'.join(lines)

def update_article(article, same_silo, cross_silo):
    """Update article with new links"""
    body = article['body']

    # Remove existing "Weiterführende Artikel" section
    body = re.sub(
        r'\n## Weiterführende Artikel\n.*?(?=\n##|\Z)',
        '',
        body,
        flags=re.DOTALL
    )

    # Create new section
    links_section = f"\n## Weiterführende Artikel\n\n{create_links_section(same_silo, cross_silo)}\n"

    # Find where to insert (before FAQ or at end)
    faq_match = re.search(r'\n## (FAQ|Häufig gestellte Fragen|Fazit)', body)

    if faq_match:
        insert_pos = faq_match.start()
        new_body = body[:insert_pos] + links_section + body[insert_pos:]
    else:
        new_body = body.rstrip() + '\n' + links_section

    # Reconstruct full content
    new_content = f"---\n{article['frontmatter_text']}\n---\n{new_body}"

    # Write file
    with open(article['filepath'], 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True

def apply_3_kings_fixes(articles):
    """Apply 3 Kings SEO fixes to opening paragraphs"""
    fixes = {
        'einzelfirma-gruenden.md': ('Eine Einzelfirma zu gründen', '**Eine Einzelfirma gründen**'),
        'buchhaltung-selbststaendige.md': ('Buchhaltung ist für viele Selbständige', '**Buchhaltung für Selbständige** ist für viele'),
        'geld-verdienen-schweiz.md': ('Als Selbständiger gibt es unzählige Wege, Geld zu verdienen', '**Geld verdienen in der Schweiz** – als Selbständiger gibt es unzählige Wege'),
        'gmbh-gruenden.md': ('Eine GmbH (Gesellschaft mit beschränkter Haftung) zu gründen', '**Eine GmbH gründen** (Gesellschaft mit beschränkter Haftung)'),
        'kunden-gewinnen-schweiz.md': ('Als Selbständiger ist Kundengewinnung', '**Kunden gewinnen** ist als Selbständiger'),
        'selbstaendig-machen-schweiz.md': ('Der Schritt in die Selbständigkeit', '**Sich selbständig machen** – der Schritt in die Selbständigkeit'),
        'selbstaendig-schweiz-berufe.md': ('Spielen Sie mit dem Gedanken, sich selbständig zu machen', '**Sich selbständig machen** – spielen Sie mit diesem Gedanken'),
        'steuern-selbststaendige.md': ('Steuern sind für Selbständige eines der komplexesten Themen', '**Steuern für Selbständige** sind eines der komplexesten Themen'),
        'tools-selbststaendige.md': ('Die richtigen digitalen Tools können', '**Die richtigen Tools für Selbständige** können'),
        'versicherungen-selbststaendige.md': ('Als Selbständiger in der Schweiz tragen Sie das volle unternehmerische Risiko – und damit auch die Verantwortung für Ihre soziale Absicherung', '**Versicherungen für Selbständige** – als Selbständiger in der Schweiz tragen Sie das volle unternehmerische Risiko und damit auch die Verantwortung für Ihre soziale Absicherung'),
    }

    for article in articles:
        if article['filename'] in fixes:
            old_text, new_text = fixes[article['filename']]
            body = article['body']

            if old_text in body:
                body = body.replace(old_text, new_text, 1)
                article['body'] = body
                print(f"  ✅ Applied 3 Kings fix to {article['filename']}")

def main():
    articles_dir = Path('/Users/romanstalder/Dropbox/JETZT/01 CODE/selbstaendig-schweiz/content/articles')

    print("\n" + "="*80)
    print("ROBUST INTERNAL LINKS UPDATE")
    print("="*80 + "\n")

    # Step 1: Analyze
    print("📊 Step 1: Analyzing all articles...")
    articles = analyze_articles(articles_dir)
    print(f"   Found {len(articles)} articles\n")

    # Step 1.5: Apply 3 Kings fixes
    print("🎯 Step 1.5: Applying 3 Kings SEO fixes...")
    apply_3_kings_fixes(articles)
    print()

    # Step 2: Group by silo
    print("🗂️  Step 2: Creating silo structure...")
    silos = group_by_silo(articles)
    for silo_name, silo_articles in sorted(silos.items()):
        print(f"   {silo_name}: {len(silo_articles)} articles")
    print()

    # Step 3: Update links
    print("🔗 Step 3: Updating internal links...\n")
    updated_count = 0

    for article in articles:
        same_silo, cross_silo = find_related_articles(article, articles, silos)

        print(f"Processing: {article['filename']}")
        print(f"  Category: {article['category']}")
        print(f"  Same-silo ({len(same_silo)}): {', '.join([a['slug'] for a in same_silo][:3])}")
        print(f"  Cross-silo ({len(cross_silo)}): {', '.join([a['slug'] for a in cross_silo][:2])}")

        try:
            if update_article(article, same_silo, cross_silo):
                updated_count += 1
                print(f"  ✅ Updated")
        except Exception as e:
            print(f"  ❌ Error: {e}")
        print()

    # Summary
    print("="*80)
    print(f"SUCCESS: {updated_count}/{len(articles)} articles updated")
    print("="*80)
    print("\n✅ Internal links and 3 Kings SEO updated successfully!")
    print("📝 Review changes and commit manually\n")

if __name__ == '__main__':
    main()
