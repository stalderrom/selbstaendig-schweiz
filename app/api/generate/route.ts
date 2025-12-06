import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { join } from 'path';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Load prompts from content-machine
function loadPrompt(promptName: string): string {
  const promptPath = join(process.cwd(), '..', 'nichen-websites-seo-content-writer', 'content-machine', 'prompts', promptName);
  try {
    return readFileSync(promptPath, 'utf-8');
  } catch (error) {
    console.error(`Error loading prompt ${promptName}:`, error);
    return '';
  }
}

export async function POST(request: NextRequest) {
  try {
    const { keyword, step, context } = await request.json();

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 });
    }

    // Load appropriate prompt based on step
    let prompt = '';
    let systemPrompt = loadPrompt('01-master-prompt.md');

    switch (step) {
      case 'research':
        prompt = loadPrompt('02-research-prompt.md');
        break;
      case 'outline':
        prompt = loadPrompt('03-outline-prompt.md');
        break;
      case 'article':
        prompt = loadPrompt('04-article-prompt.md');
        break;
      case 'meta':
        prompt = loadPrompt('05-meta-prompt.md');
        break;
      case 'links':
        prompt = loadPrompt('07-internal-link-prompt.md');
        break;
      case 'schema':
        prompt = loadPrompt('06-schema-prompt.md');
        break;
      default:
        return NextResponse.json({ error: 'Invalid step' }, { status: 400 });
    }

    // Replace placeholders
    prompt = prompt.replace(/{KEYWORD}/g, keyword);

    if (context?.outline) {
      prompt = prompt.replace(/{OUTLINE}/g, context.outline);
    }
    if (context?.research) {
      prompt = prompt.replace(/{RESEARCH}/g, context.research);
    }
    if (context?.title) {
      prompt = prompt.replace(/{TITLE}/g, context.title);
    }
    if (context?.description) {
      prompt = prompt.replace(/{DESCRIPTION}/g, context.description);
    }
    if (context?.url) {
      prompt = prompt.replace(/{URL}/g, context.url);
    }
    if (context?.silo) {
      prompt = prompt.replace(/{SILO_NAME}/g, context.silo);
    }

    // Add current date
    const today = new Date().toISOString().split('T')[0];
    prompt = prompt.replace(/{DATUM}/g, today);

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Extract text from response
    const responseText = message.content
      .filter(block => block.type === 'text')
      .map(block => (block as any).text)
      .join('\n');

    return NextResponse.json({
      success: true,
      content: responseText,
      step,
      keyword
    });

  } catch (error: any) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: 500 }
    );
  }
}
