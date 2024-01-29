import mysql from "mysql2/promise";

export async function query(query, values) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
  });

  try {
    const [results] = await connection.execute(query, values);
    connection.end();
    return results;
  } catch (err) {
    throw Error(err.message);
  }
}
