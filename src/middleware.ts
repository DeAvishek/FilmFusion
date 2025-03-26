import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const url = request.nextUrl;

  // Redirect authenticated users away from sign-in or sign-up
  if (token) {
    if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // Allow unauthenticated users to access '/'
    if (url.pathname === "/" || url.pathname === "/sign-in" || url.pathname === "/sign-up") {
      return NextResponse.next();
    }
    // Redirect unauthenticated users to sign-in for other routes
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/((?!_next|api|public).*)"],
};
