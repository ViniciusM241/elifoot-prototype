import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, res) {
  try {
    const cookieStore = cookies();
    const oneDay = 24 * 60 * 60 * 1000;

    cookieStore.set("token", "null", { expires: Date.now() - oneDay });

    return NextResponse.redirect(process.env.BASEURL, {
      headers: { "Set-Cookie": `token=${"null"}` },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
