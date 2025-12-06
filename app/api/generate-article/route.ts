import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { readFileSync } from 'fs';
import { createJob, updateJob } from '@/lib/jobManager';

// Increase timeout to 5 minutes for long-running article generation
export const maxDuration = 300; // 5 minutes
export const dynamic = 'force-dynamic';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Load prompts
function loadPrompt(promptName: string): string {
  const promptPath = join(process.cwd(), '..', 'nichen-websites-seo-content-writer', 'content-machine', 'prompts', promptName);
  try {
    return readFileSync(promptPath, 'utf-8');
  } catch (error) {
    console.error(`Error loading prompt ${promptName}:`, error);
    return '';
  }
}

// Generate content with Claude
async function generateWithClaude(systemPrompt: string, userPrompt: string, maxTokens: number = 8192): Promise<string> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }]
  });

  return message.content
    .filter(block => block.type === 'text')
    .map(block => (block as any).text)
    .join('\n');
}

// Helper function to get the relevant year for guides
function getRelevantYear(): number {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed (0 = January, 11 = December)

  // If it's December (month 11), use next year for guides
  return currentMonth === 11 ? currentYear + 1 : currentYear;
}

export async function POST(request: NextRequest) {
  try {
    const { keyword, silo = 'Berufsratgeber' } = await request.json();

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 });
    }

    // Create job and return immediately
    const job = createJob(keyword, silo);

    // Start generation in background (don't await)
    generateArticleInBackground(job.id, keyword, silo).catch(error => {
      updateJob(job.id, {
        status: 'error',
        error: error.message,
        progress: 0
      });
    });

    // Return job ID immediately
    return NextResponse.json({
      success: true,
      jobId: job.id,
      message: 'Article generation started in background'
    });

  } catch (error: any) {
    console.error('Error starting article generation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to start generation' },
      { status: 500 }
    );
  }
}

async function generateArticleInBackground(jobId: string, keyword: string, silo: string) {
  try {
    const masterPrompt = loadPrompt('01-master-prompt.md');
    const today = new Date().toISOString().split('T')[0];
    const relevantYear = getRelevantYear();

    // Step 1: Research
    updateJob(jobId, { status: 'research', progress: 10 });
    let researchPrompt = loadPrompt('02-research-prompt.md')
      .replace(/{KEYWORD}/g, keyword)
      .replace(/{YEAR}/g, relevantYear.toString());
    const research = await generateWithClaude(masterPrompt, researchPrompt);

    // Step 2: Outline
    updateJob(jobId, { status: 'outline', progress: 30 });
    let outlinePrompt = loadPrompt('03-outline-prompt.md')
      .replace(/{KEYWORD}/g, keyword)
      .replace(/{YEAR}/g, relevantYear.toString());
    const outline = await generateWithClaude(masterPrompt, outlinePrompt);

    // Step 3: Article (use higher max_tokens for complete articles)
    updateJob(jobId, { status: 'article', progress: 50 });
    let articlePrompt = loadPrompt('04-article-prompt.md')
      .replace(/{KEYWORD}/g, keyword)
      .replace(/{OUTLINE}/g, outline)
      .replace(/{RESEARCH}/g, research)
      .replace(/{YEAR}/g, relevantYear.toString());
    const article = await generateWithClaude(masterPrompt, articlePrompt, 16384); // Much higher limit for full articles

    // Validate article completeness
    const hasFAQ = article.includes('FAQ') || article.includes('Häufig gestellte Fragen');
    const hasFazit = article.includes('Fazit') || article.includes('## Fazit');
    const wordCount = article.split(/\s+/).length;

    if (!hasFAQ || !hasFazit || wordCount < 1000) {
      console.warn(`⚠️  WARNUNG: Artikel "${keyword}" könnte unvollständig sein!`);
      console.warn(`   - FAQ vorhanden: ${hasFAQ}`);
      console.warn(`   - Fazit vorhanden: ${hasFazit}`);
      console.warn(`   - Wortanzahl: ${wordCount}`);
    }

    // Step 4: Meta Data
    updateJob(jobId, { status: 'meta', progress: 70 });
    let metaPrompt = loadPrompt('05-meta-prompt.md')
      .replace(/{KEYWORD}/g, keyword)
      .replace(/{YEAR}/g, relevantYear.toString());
    const metaData = await generateWithClaude(masterPrompt, metaPrompt);

    // Step 5: Internal Links
    updateJob(jobId, { status: 'links', progress: 85 });
    let linksPrompt = loadPrompt('07-internal-link-prompt.md')
      .replace(/{KEYWORD}/g, keyword)
      .replace(/{SILO_NAME}/g, silo);
    const links = await generateWithClaude(masterPrompt, linksPrompt);

    // Parse meta data (simple extraction)
    const metaLines = metaData.split('\n');
    let title = keyword;
    let description = '';
    let urlSlug = keyword.toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    let category = silo.toLowerCase().replace(/\s+/g, '-');
    let keywords: string[] = [keyword];

    // Extract from YAML-like structure
    for (const line of metaLines) {
      if (line.includes('meta_title:')) {
        title = line.split(':')[1].replace(/['"]/g, '').trim();
      }
      if (line.includes('meta_description:')) {
        description = line.split(':')[1].replace(/['"]/g, '').trim();
      }
      if (line.includes('url_slug:')) {
        urlSlug = line.split(':')[1].replace(/['"]/g, '').trim();
      }
    }

    // Create Markdown file with frontmatter
    const markdown = `---
title: "${title}"
description: "${description}"
keywords: ${JSON.stringify(keywords)}
category: "${category}"
author: "Redaktion"
publishedAt: "${today}"
slug: "${urlSlug}"
---

${article}

## Weiterführende Artikel

${links}
`;

    // Save to content/articles
    const filePath = join(process.cwd(), 'content', 'articles', `${urlSlug}.md`);
    writeFileSync(filePath, markdown);

    // Update job to completed
    updateJob(jobId, {
      status: 'completed',
      progress: 100,
      completedAt: new Date().toISOString(),
      result: {
        filePath: `content/articles/${urlSlug}.md`,
        url: `/artikel/${urlSlug}`,
        metadata: {
          title,
          description,
          urlSlug,
          category,
          keywords
        },
        validation: {
          hasFAQ,
          hasFazit,
          wordCount,
          isComplete: hasFAQ && hasFazit && wordCount >= 1000,
          warning: (!hasFAQ || !hasFazit || wordCount < 1000)
            ? '⚠️ Artikel könnte unvollständig sein - bitte überprüfen!'
            : null
        }
      }
    });

  } catch (error: any) {
    console.error('Error generating article:', error);
    updateJob(jobId, {
      status: 'error',
      error: error.message || 'Failed to generate article',
      progress: 0
    });
  }
}
