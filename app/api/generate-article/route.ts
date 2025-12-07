import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs/promises';
import path from 'path';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Lade Prompts
async function loadPrompt(filename: string): Promise<string> {
  const promptPath = path.join(process.cwd(), '..', 'nichen-websites-seo-content-writer', 'content-machine', 'prompts', filename);
  try {
    return await fs.readFile(promptPath, 'utf-8');
  } catch (error) {
    console.error(`Failed to load prompt ${filename}:`, error);
    throw new Error(`Prompt-Datei ${filename} konnte nicht geladen werden`);
  }
}

export async function POST(request: Request) {
  try {
    const { keyword, category } = await request.json();

    if (!keyword || !category) {
      return NextResponse.json(
        { error: 'Keyword und Kategorie sind erforderlich' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY ist nicht konfiguriert' },
        { status: 500 }
      );
    }

    // Jahr bestimmen (ab Dezember: nächstes Jahr)
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const year = currentMonth === 12 ? currentYear + 1 : currentYear;

    console.log(`Generating article for keyword: ${keyword}, category: ${category}`);

    // Lade alle Prompts
    const masterPrompt = await loadPrompt('01-master-prompt.md');
    const researchPrompt = await loadPrompt('02-research-prompt.md');
    const outlinePrompt = await loadPrompt('03-outline-prompt.md');
    const articlePrompt = await loadPrompt('04-article-prompt.md');
    const metaPrompt = await loadPrompt('05-meta-prompt.md');

    console.log('Prompts loaded successfully');

    // Schritt 1: Research
    console.log('Step 1: Research...');
    const researchMessage = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: `${masterPrompt}\n\n${researchPrompt}\n\nTHEMA: ${keyword}\n\nLiefere mir schweiz-spezifische Informationen zu diesem Thema.`
      }]
    });

    const research = researchMessage.content[0].type === 'text'
      ? researchMessage.content[0].text
      : '';

    console.log('Research completed');

    // Schritt 2: Outline
    console.log('Step 2: Outline...');
    const outlineMessage = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: `${masterPrompt}\n\n${outlinePrompt}\n\nKEYWORD: ${keyword}\nRELEVANTES JAHR: ${year}\n\nErstelle eine detaillierte Outline.`
      }]
    });

    const outline = outlineMessage.content[0].type === 'text'
      ? outlineMessage.content[0].text
      : '';

    console.log('Outline completed');

    // Schritt 3: Vollständiger Artikel
    console.log('Step 3: Full Article...');
    const articleMessage = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [{
        role: 'user',
        content: articlePrompt
          .replace('{KEYWORD}', keyword)
          .replace('{YEAR}', year.toString())
          .replace('{OUTLINE}', outline)
          .replace('{RESEARCH}', research)
      }]
    });

    const article = articleMessage.content[0].type === 'text'
      ? articleMessage.content[0].text
      : '';

    console.log('Article completed');

    // Schritt 4: Meta-Daten
    console.log('Step 4: Meta data...');
    const metaMessage = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: metaPrompt
          .replace('{KEYWORD}', keyword)
          .replace('{YEAR}', year.toString()) +
          `\n\n---\n\nARTIKEL-INHALT (analysiere diesen um zu entscheiden ob Jahreszahl sinnvoll ist):\n\n${article.substring(0, 3000)}`
      }]
    });

    const metaText = metaMessage.content[0].type === 'text'
      ? metaMessage.content[0].text
      : '';

    console.log('Meta data completed');

    // Parse Meta-Daten (vereinfachte Version)
    const titleMatch = metaText.match(/meta_title:\s*"([^"]+)"/);
    const descMatch = metaText.match(/meta_description:\s*"([^"]+)"/);
    const slugMatch = metaText.match(/url_slug:\s*"([^"]+)"/);
    const keywordsMatch = metaText.match(/secondary_keywords:\s*\n([\s\S]*?)(?=\ntags:|$)/);

    const title = titleMatch ? titleMatch[1] : `${keyword} - Guide ${year}`;
    const description = descMatch ? descMatch[1] : `Alles über ${keyword} in der Schweiz`;
    const slug = slugMatch ? slugMatch[1] : keyword
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/[^a-z0-9-]/g, '');

    // Erstelle Keywords Array
    const keywords = [keyword];
    if (keywordsMatch) {
      const secondaryKeywords = keywordsMatch[1]
        .split('\n')
        .map(k => k.trim().replace(/^-\s*"?/, '').replace(/"?$/, ''))
        .filter(k => k.length > 0);
      keywords.push(...secondaryKeywords.slice(0, 4));
    }

    // Erstelle Markdown-Datei
    const markdownContent = `---
title: "${title}"
description: "${description}"
keywords: [${keywords.map(k => `"${k}"`).join(', ')}]
category: "${category}"
author: "Redaktion"
publishedAt: "${new Date().toISOString().split('T')[0]}"
slug: "${slug}"
---

${article}
`;

    // Speichere Artikel
    const articlesDir = path.join(process.cwd(), 'content', 'articles');
    await fs.mkdir(articlesDir, { recursive: true });
    const filePath = path.join(articlesDir, `${slug}.md`);
    await fs.writeFile(filePath, markdownContent, 'utf-8');

    console.log(`Article saved to: ${filePath}`);

    return NextResponse.json({
      success: true,
      slug,
      title,
      filePath: `/content/articles/${slug}.md`,
      preview: article.substring(0, 500) + '...'
    });

  } catch (error) {
    console.error('Error generating article:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unbekannter Fehler' },
      { status: 500 }
    );
  }
}
