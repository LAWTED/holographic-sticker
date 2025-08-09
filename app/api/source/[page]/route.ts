import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ page: string }> }
) {
  const params = await context.params;
  const page = params.page;
  
  // 直接redirect到静态文件
  const staticFileUrl = `/source/${page}.txt`;
  
  return NextResponse.redirect(new URL(staticFileUrl, request.url));
}