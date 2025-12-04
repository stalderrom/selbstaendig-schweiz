import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { slug, content } = await request.json();

    if (!slug || !content) {
      return NextResponse.json(
        { error: 'Slug and content are required' },
        { status: 400 }
      );
    }

    const articlesDir = path.join(process.cwd(), 'content/articles');

    // Create directory if it doesn't exist
    if (!fs.existsSync(articlesDir)) {
      fs.mkdirSync(articlesDir, { recursive: true });
    }

    const filePath = path.join(articlesDir, `${slug}.md`);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Article with this slug already exists' },
        { status: 409 }
      );
    }

    // Write file
    fs.writeFileSync(filePath, content, 'utf8');

    return NextResponse.json({
      success: true,
      slug,
      message: 'Article created successfully'
    });

  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const articlesDir = path.join(process.cwd(), 'content/articles');

    if (!fs.existsSync(articlesDir)) {
      return NextResponse.json({ articles: [] });
    }

    const files = fs.readdirSync(articlesDir);
    const articles = files
      .filter(file => file.endsWith('.md'))
      .map(file => ({
        slug: file.replace('.md', ''),
        filename: file
      }));

    return NextResponse.json({ articles });

  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
