import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 获取当前路径
  const pathname = request.nextUrl.pathname;

  // 克隆请求头并设置自定义头
  const headers = new Headers(request.headers);
  
  headers.set('x-pathname', pathname);

  // 传递修改后的头信息
  return NextResponse.next({
    request: {
      headers: headers,
    },
  });
}