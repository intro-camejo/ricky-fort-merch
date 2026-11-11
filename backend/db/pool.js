import pg from "pg";

export const db = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "ricky",
  password: "comandante",
  database: "merch",
});

db.on("error", (err) => {
  console.error("Error en la conexión con la base:", err.message);
});
