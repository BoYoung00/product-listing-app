import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const viewType = request.cookies.get("viewType");

  if (!viewType) {
    const random = Math.random() > 0.5 ? "grid" : "list";
    const response = NextResponse.next();

    response.cookies.set("viewType", random, {
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  }

  return NextResponse.next();
}
