import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { query } from "@/lib/db";
import { createJwt } from "@/lib/jwt";

export async function POST(req, res) {
  try {
    const data = await req.json();

    if (!data || !data.email || !data.password) {
      return NextResponse.json({ message: "BadRequest" }, { status: 400 });
    }

    const sql = `SELECT id, address, name, password FROM tcoach02
      INNER JOIN taddr01 ON (tcoach02.addressId = taddr01.addressId)
      WHERE address = ? AND password = ?;`;
    const values = [data.email, data.password];
    const result = await query(sql, values);

    if (result.length) {
      const user = result[0];
      const token = createJwt(user);
      const cookieStore = cookies();
      const oneDay = 24 * 60 * 60 * 1000;

      cookieStore.set("token", token, { expires: Date.now() + oneDay });

      return NextResponse.json(
        { token: token },
        {
          headers: { "Set-Cookie": `token=${token}` },
        },
      );
    } else {
      return NextResponse.json(
        { message: "E-mail ou senha incorretos" },
        { status: 400 },
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
