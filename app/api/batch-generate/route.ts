import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { readFileSync } from 'fs';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

function loadPrompt(promptName: string): string {
  const promptPath = join(process.cwd(), '..', 'nichen-websites-seo-content-writer', 'content-machine', 'prompts', promptName);
  try {
    return readFileSync(promptPath, 'utf-8');
  } catch (error) {
    console.error(`Error loading prompt ${promptName}:`, error);
    return '';
  }
}

async function generateWithClaude(systemPrompt: string, userPrompt: string): Promise<string> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8192, // Larger for batch
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
    const { keywords } = await request.json();

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json({ error: 'Keywords array is required' }, { status: 400 });
    }

    if (keywords.length > 50) {
      return NextResponse.json({ error: 'Maximum 50 keywords per batch' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 });
    }

    const masterPrompt = loadPrompt('01-master-prompt.md');
    const relevantYear = getRelevantYear();
    let batchPrompt = loadPrompt('08-batch-prompt.md');

    // Format keywords list
    const keywordList = keywords.map((kw, i) => `${i + 1}. ${kw}`).join('\n');
    batchPrompt = batchPrompt
      .replace(/{LISTE_MIT_10-50_KEYWORDS}/g, keywordList)
      .replace(/{YEAR}/g, relevantYear.toString());

    // Generate batch outlines
    const batchResult = await generateWithClaude(masterPrompt, batchPrompt);

    // Parse the batch result (this is simplified - you might want more sophisticated parsing)
    const articles = batchResult.split('=====================').filter(s => s.trim());

    const results = articles.map((articleData, index) => {
      // Extract basic info (simplified parsing)
      const lines = articleData.split('\n').filter(l => l.trim());

      return {
        keyword: keywords[index] || `keyword-${index}`,
        outline: articleData.substring(0, 500) + '...',
        status: 'outline_generated'
      };
    });

    // Save batch result
    const timestamp = Date.now();
    const batchFilePath = join(process.cwd(), 'content', 'batch', `batch-${timestamp}.json`);
    writeFileSync(batchFilePath, JSON.stringify({
      timestamp,
      keywords,
      results,
      rawOutput: batchResult
    }, null, 2));

    return NextResponse.json({
      success: true,
      batchId: timestamp,
      totalKeywords: keywords.length,
      results,
      batchFilePath: `content/batch/batch-${timestamp}.json`
    });

  } catch (error: any) {
    console.error('Error in batch generation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate batch' },
      { status: 500 }
    );
  }
}
