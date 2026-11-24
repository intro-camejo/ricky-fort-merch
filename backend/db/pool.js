import pg from "pg";

export const db = new pg.Pool({
  host: process.env.PG_HOST ?? "localhost",
  port: process.env.PG_PORT ?? 5432,
  user: process.env.PG_USER ?? "ricky",
  password: process.env.PG_PASS ?? "comandante",
  database: process.env.PG_NAME ?? "merch",
  ssl: (process.env.PG_SSL === 'true') ?? false,
});

db.on("error", (err) => {
  console.error("Error en la conexión con la base:", err.message);
});
