import { NextRequest, NextResponse } from "next/server";

import { api } from "@root/lib/api";

interface RegisterResponseBody {
  token: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const redirectTo = request.cookies.get("redirectTo")?.value;

  const code = searchParams.get("code");

  const registerResponse = await api.post<RegisterResponseBody>("/register", {
    code
  });

  const { token } = registerResponse.data;

  const redirectURL = redirectTo ?? new URL("/", request.url);

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30; // 1 month

  return NextResponse.redirect(redirectURL, {
    headers: {
      "Set-Cookie": `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`
    }
  });
}
