import { NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function GET(req, res) {
  const sql =
    "SELECT gameversion as id, versioncode as code, versiondesc as description FROM tgver07 WHERE gameversion > 0;";
  const values = [];
  const data = await query(sql, values);

  const handledData = data.map((x) => ({
    ...x,
    url: process.env.BASEURL + "/versions/" + x.code,
  }));

  return NextResponse.json(handledData);
}
