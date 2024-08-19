import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authKey } from "./constants/auth";
const AuthRoutes = ["/login", "/register"];
const commonPrivateRoutes = ["/chat"];
export function middleware(request: NextRequest) {
  console.log("Console from middleware");
  const { pathname } = request.nextUrl;
  const accessToken = cookies().get(authKey)?.value;

  console.log("access", accessToken);
  if (!accessToken) {
    console.log("not access token");
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (accessToken && commonPrivateRoutes.includes(pathname)) {
    console.log("Go to the next chat");
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/chat/:path*"],
};
