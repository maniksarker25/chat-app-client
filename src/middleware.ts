// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { authKey } from "./constants/auth";
// const AuthRoutes = ["/login", "/register"];
// const commonPrivateRoutes = ["/chat"];
// export function middleware(request: NextRequest) {
//   console.log("Console from middleware");
//   const { pathname } = request.nextUrl;
//   const accessToken = cookies().get(authKey)?.value;

//   console.log("access", accessToken);
//   if (!accessToken) {
//     console.log("not access token");
//     if (AuthRoutes.includes(pathname)) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }
//   if (accessToken && commonPrivateRoutes.includes(pathname)) {
//     console.log("Go to the next chat");
//     return NextResponse.next();
//   }
//   return NextResponse.redirect(new URL("/login", request.url));
// }

// export const config = {
//   matcher: ["/chat/:path*"],
// };

// another way
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authKey } from "./constants/auth";

const AuthRoutes = ["/login", "/register"]; // Routes that don't need auth
const ProtectedRoutes = ["/chat"]; // Base routes that need auth

export function middleware(request: NextRequest) {
  console.log("Console from middleware");
  const { pathname } = request.nextUrl;
  const accessToken = cookies().get(authKey)?.value;

  // Allow access to public routes
  if (AuthRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if the path starts with a protected route and has a valid token
  const isProtected = ProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtected && !accessToken) {
    console.log("No access token for protected route");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access if token is present or path is not protected
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], // This matcher includes all routes
};
