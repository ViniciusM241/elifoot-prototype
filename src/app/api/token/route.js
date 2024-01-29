import { NextResponse } from "next/server";

import { verifyJwt } from "@/lib/jwt";

export async function POST(req, res) {
  try {
    const body = await req.json();

    if (!body || !body.token || body.token === "null") {
      return NextResponse.json({ isValid: false });
    }

    const decoded = verifyJwt(body.token);

    if (!decoded) {
      return NextResponse.json({ isValid: false });
    }

    return NextResponse.json({ isValid: true, decoded });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
