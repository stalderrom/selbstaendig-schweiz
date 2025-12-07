#!/usr/bin/env python3
"""
Check all articles for SEO "3 Kings" compliance:
1. Title tag contains keyword
2. H1 contains keyword
3. Opening paragraph (first 100 words) contains keyword
"""

import os
import re
from pathlib import Path

def extract_frontmatter(content):
    """Extract YAML frontmatter from markdown"""
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if not match:
        return None, content
    return match.group(1), match.group(2)

def extract_title_from_frontmatter(frontmatter):
    """Extract title from frontmatter"""
    match = re.search(r"title:\s*['\"]?([^'\"]+)['\"]?", frontmatter)
    return match.group(1) if match else None

def extract_keywords_from_frontmatter(frontmatter):
    """Extract keywords array from frontmatter"""
    # Find the keywords section
    keywords_match = re.search(r'keywords:\s*\n((?:\s+-.*\n)+)', frontmatter)
    if not keywords_match:
        return []

    # Extract individual keywords
    keywords_text = keywords_match.group(1)
    keywords = re.findall(r'-\s+([^\n]+)', keywords_text)
    return [k.strip().strip('"').strip("'") for k in keywords]

def extract_h1(content):
    """Extract first H1 from content"""
    match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    return match.group(1) if match else None

def extract_opening_paragraph(content):
    """Extract first ~200 characters after H1"""
    # Remove H1
    content_after_h1 = re.sub(r'^#\s+.+$', '', content, count=1, flags=re.MULTILINE)
    # Get first paragraph (up to first ## or 200 chars)
    first_para_match = re.search(r'^\s*(.+?)(?:\n##|\n\n|$)', content_after_h1, re.DOTALL)
    if first_para_match:
        para = first_para_match.group(1).strip()
        return para[:300]  # First 300 chars
    return ""

def check_keyword_in_text(keyword, text):
    """Check if keyword appears in text (case insensitive)"""
    if not text or not keyword:
        return False
    # Normalize: lowercase and remove extra spaces
    keyword_normalized = ' '.join(keyword.lower().split())
    text_normalized = text.lower()
    return keyword_normalized in text_normalized

def analyze_article(filepath):
    """Analyze a single article for 3 Kings compliance"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    frontmatter, body = extract_frontmatter(content)
    if not frontmatter:
        return None

    # Extract data
    title_tag = extract_title_from_frontmatter(frontmatter)
    keywords = extract_keywords_from_frontmatter(frontmatter)
    main_keyword = keywords[0] if keywords else None
    h1 = extract_h1(body)
    opening = extract_opening_paragraph(body)

    # Check 3 Kings
    results = {
        'file': os.path.basename(filepath),
        'keyword': main_keyword,
        'title_tag': title_tag,
        'h1': h1,
        'opening': opening[:100] + '...' if len(opening) > 100 else opening,
        'king1_ok': check_keyword_in_text(main_keyword, title_tag) if main_keyword else False,
        'king2_ok': check_keyword_in_text(main_keyword, h1) if main_keyword else False,
        'king3_ok': check_keyword_in_text(main_keyword, opening) if main_keyword else False,
    }

    return results

def main():
    articles_dir = Path('/Users/romanstalder/Dropbox/JETZT/01 CODE/selbstaendig-schweiz/content/articles')

    all_results = []

    for article_file in sorted(articles_dir.glob('*.md')):
        result = analyze_article(article_file)
        if result:
            all_results.append(result)

    # Print results
    print("\n" + "="*80)
    print("SEO '3 KINGS' COMPLIANCE CHECK")
    print("="*80 + "\n")

    compliant_count = 0
    non_compliant = []

    for result in all_results:
        all_ok = result['king1_ok'] and result['king2_ok'] and result['king3_ok']

        if all_ok:
            compliant_count += 1
            status = "✅ ALL OK"
        else:
            non_compliant.append(result)
            status = "❌ ISSUES"

        print(f"{status} - {result['file']}")
        print(f"   Keyword: {result['keyword']}")
        print(f"   King #1 (Title Tag): {'✓' if result['king1_ok'] else '✗'} {result['title_tag']}")
        print(f"   King #2 (H1): {'✓' if result['king2_ok'] else '✗'} {result['h1']}")
        print(f"   King #3 (Opening): {'✓' if result['king3_ok'] else '✗'}")
        if not result['king3_ok']:
            print(f"      Opening text: {result['opening']}")
        print()

    # Summary
    print("="*80)
    print(f"SUMMARY: {compliant_count}/{len(all_results)} articles fully compliant")
    print(f"Issues found in: {len(non_compliant)} articles")
    print("="*80)

    if non_compliant:
        print("\n🔧 ARTICLES NEEDING FIXES:\n")
        for result in non_compliant:
            issues = []
            if not result['king1_ok']: issues.append("Title Tag")
            if not result['king2_ok']: issues.append("H1")
            if not result['king3_ok']: issues.append("Opening Paragraph")

            print(f"  • {result['file']}")
            print(f"    Keyword: '{result['keyword']}'")
            print(f"    Fix: {', '.join(issues)}")
            print()

if __name__ == '__main__':
    main()
