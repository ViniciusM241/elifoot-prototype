import { i18nRouter } from "next-i18n-router";
import { NextResponse } from "next/server";

import i18nConfig from "./i18nConfig";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/api")) {
    if (request.nextUrl.pathname.startsWith("/api/users/")) {
      try {
        const token = request.headers.get("authorization")?.split(" ")[1];
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASEURL}/token`,
          {
            method: "POST",
            body: JSON.stringify({ token }),
          },
        );

        const decoded = await result.json();

        if (!token || !decoded.isValid) {
          return Response.json(
            { success: false, message: "authentication failed" },
            { status: 401 },
          );
        } else {
          const locale = {
            userId: decoded.decoded.id,
          };
          const cloned = request.clone();
          cloned.headers.append("Cookie", `locale=${JSON.stringify(locale)}`);

          return NextResponse.rewrite(request.nextUrl, { request: cloned });
        }
      } catch (err) {
        console.log(err);
        return Response.json(
          { success: false, message: "authentication failed" },
          { status: 500 },
        );
      }
    }

    return NextResponse.next();
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: "/((?!static|.*\\..*|_next).*)",
};
