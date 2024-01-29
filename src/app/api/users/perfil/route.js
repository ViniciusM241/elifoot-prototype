import { NextResponse } from "next/server";

import { query } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";

export const dynamic = "force-dynamic";

async function getRanking(userId) {
  const sql = `SELECT coachId, coachName, points, tcoachrk06.rankingPosition FROM (
SELECT rankingPosition FROM tcoach02
INNER JOIN tcoachrk06 ON (tcoach02.id = tcoachrk06.coachId)
WHERE id = ?
) t
INNER JOIN tcoachrk06
WHERE tcoachrk06.rankingPosition IN (t.rankingPosition, t.rankingPosition + 1, t.rankingPosition + 2, t.rankingPosition - 1, t.rankingPosition - 2)`;
  const values = [userId];
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

  return handledData;
}

async function getInfo(userId) {
  const sql = `SELECT id, name, status, numFollowers, address as email, teamName FROM tcoach02
INNER JOIN taddr01 ON (taddr01.addressId = tcoach02.addressId)
INNER JOIN tcoachp05 ON (tcoachp05.coachId = tcoach02.id)
WHERE id = ?;`;
  const values = [userId];
  const data = await query(sql, values);

  return data;
}

async function getScoreByGame(userId) {
  const sql =
    "SELECT timestamp, coachId, teamName, points FROM tcoachgpt03 WHERE coachId = ? LIMIT 50;";
  const values = [userId];
  const data = await query(sql, values);

  return data;
}

export async function GET(req, res) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded = verifyJwt(token);
    const userId = decoded.id;

    const [ranking, info, scoreByGame] = await Promise.all([
      (async () => await getRanking(userId))(),
      (async () => await getInfo(userId))(),
      (async () => await getScoreByGame(userId))(),
    ]);

    const data = {
      ranking,
      info: info[0],
      scoreByGame,
    };

    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
