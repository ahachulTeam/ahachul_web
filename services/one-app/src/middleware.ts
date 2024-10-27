import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('middleware', request.nextUrl.pathname);
  // const session = await auth();
  // if (!session) {
  //   return NextResponse.redirect('http://localhost:3000/login');
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/messages'],
};
