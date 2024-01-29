import { NextResponse } from "next/server";

import { query } from "@/lib/db";

export async function GET(req, res) {
  const sql =
    "SELECT rankingPosition as rankingNumber, coachName as name, points as pts FROM tcoachrk06 LIMIT 10;";
  const values = [];
  const data = await query(sql, values);
  const handledData = data.map((x) => {
    let country = "BR";
    if (x.rankingNumber % 2 === 0) {
      country = "PT";
    }

    if (x.rankingNumber % 5 === 0) {
      country = "US";
    }

    return { ...x, country };
  });

  return NextResponse.json(handledData);
}
