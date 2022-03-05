import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req: req as any,
    secret: process.env.JWT_SECRET,
  });
  const { pathname } = req.nextUrl;

  if (pathname.includes("/api/auth") || token) return NextResponse.next();

  if (!token && pathname !== "/auth/login")
    return NextResponse.redirect("/auth/login");
};

export default middleware;
