import pg from "pg";

export const db = new pg.Pool({
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  user: "ricky",
  password: "comandante",
  database: "merch",
});

db.on("error", (err) => {
  console.error("Error en la conexión con la base:", err.message);
});
