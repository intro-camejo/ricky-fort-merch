import pg from "pg";

export const db = new pg.Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.on("error", (err) => {
  console.error("Error en la conexión con la base:", err.message);
});
