#!/usr/bin/env python3
"""
Automatically fix all articles for SEO "3 Kings" compliance
by adding keyword in bold to the opening paragraph
"""

import os
import re
from pathlib import Path

# Manual fixes for each article
FIXES = {
    'geld-verdienen-schweiz.md': {
        'keyword': 'Geld verdienen in der Schweiz',
        'old_start': 'Als Selbständiger gibt es',
        'new_start': '**Geld verdienen in der Schweiz** – als Selbständiger gibt es'
    },
    'gmbh-gruenden.md': {
        'keyword': 'GmbH gründen',
        'old_start': 'Eine GmbH (Gesellschaft mit beschränkter Haftung) zu gründen',
        'new_start': '**Eine GmbH gründen** (Gesellschaft mit beschränkter Haftung)'
    },
    'kunden-gewinnen-schweiz.md': {
        'keyword': 'Kunden gewinnen',
        'old_start': 'Als Selbständiger ist Kundengewinnung Ihre wichtigste Aufgabe.',
        'new_start': '**Kunden gewinnen** ist als Selbständiger Ihre wichtigste Aufgabe.'
    },
    'selbstaendig-machen-schweiz.md': {
        'keyword': 'Selbständig machen',
        'old_start': 'Der Schritt in die Selbständigkeit',
        'new_start': '**Sich selbständig machen** – der Schritt in die Selbständigkeit'
    },
    'selbstaendig-schweiz-berufe.md': {
        'keyword': 'Selbständig machen',
        'old_start': 'Spielen Sie mit dem Gedanken, sich selbständig zu machen',
        'new_start': '**Sich selbständig machen** – spielen Sie mit diesem Gedanken'
    },
    'steuern-selbststaendige.md': {
        'keyword': 'Steuern für Selbständige',
        'old_start': 'Steuern sind für Selbständige eines der komplexesten Themen',
        'new_start': '**Steuern für Selbständige** sind eines der komplexesten Themen'
    },
    'tools-selbststaendige.md': {
        'keyword': 'Tools für Selbständige',
        'old_start': 'Die richtigen digitalen Tools können Ihren Arbeitsalltag revolutionieren.',
        'new_start': '**Die richtigen Tools für Selbständige** können Ihren Arbeitsalltag revolutionieren.'
    },
    'versicherungen-selbststaendige.md': {
        'keyword': 'Versicherungen für Selbständige',
        'old_start': 'Als Selbständiger in der Schweiz tragen Sie das volle unternehmerische Risiko',
        'new_start': '**Versicherungen für Selbständige** – als Selbständiger in der Schweiz tragen Sie das volle unternehmerische Risiko'
    },
}

def fix_article(filepath, keyword, old_start, new_start):
    """Fix a single article"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the opening
    if old_start in content:
        new_content = content.replace(old_start, new_start, 1)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return True
    else:
        print(f"  ⚠️  Could not find: '{old_start[:50]}...'")
        return False

def main():
    articles_dir = Path('/Users/romanstalder/Dropbox/JETZT/01 CODE/selbstaendig-schweiz/content/articles')

    print("\n" + "="*80)
    print("FIXING 3 KINGS COMPLIANCE - OPENING PARAGRAPHS")
    print("="*80 + "\n")

    fixed_count = 0

    for filename, fix_data in FIXES.items():
        filepath = articles_dir / filename

        if not filepath.exists():
            print(f"❌ {filename} - File not found")
            continue

        print(f"Processing: {filename}")
        print(f"  Keyword: {fix_data['keyword']}")

        if fix_article(filepath, fix_data['keyword'], fix_data['old_start'], fix_data['new_start']):
            print(f"  ✅ Fixed!")
            fixed_count += 1

        print()

    print("="*80)
    print(f"DONE: {fixed_count}/{len(FIXES)} articles fixed")
    print("="*80)

if __name__ == '__main__':
    main()
