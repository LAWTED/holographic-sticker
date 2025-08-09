import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ page: string }> }
) {
  try {
    const params = await context.params;
    const page = params.page;
    const filePath = join(process.cwd(), 'app', page, 'page.tsx');
    const sourceCode = readFileSync(filePath, 'utf-8');
    
    return new NextResponse(sourceCode, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch {
    return new NextResponse('File not found', { status: 404 });
  }
}