import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { db } from "./db/pool.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const openapi = JSON.parse(readFileSync(new URL("./openapi.json", import.meta.url), "utf8"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

// Pendiente de repasar en clase: interaccion con db en POST, PUT y DELETE

function parseId(texto) {
  const id = Number(texto);

  if (!Number.isInteger(id) || id < 1) {
    return null;
  }

  return id;
}

function validarProducto(body) {
  if (body === undefined) {
    return "falta el body";
  }

  if (body.name === undefined || body.price === undefined || body.image === undefined) {
    return "name, price e image son obligatorios";
  }

  if (typeof body.name !== "string" || body.name.trim().length < 3) {
    return "name debe ser un texto de al menos 3 caracteres";
  }

  const price = Number(body.price);

  if (isNaN(price) || price <= 0) {
    return "price debe ser un número mayor a 0";
  }

  if (typeof body.image !== "string") {
    return "image debe ser un texto";
  }

  return null;
}

app.get("/products", async (req, res) => {
  const result = await db.query("SELECT * FROM products ORDER BY id");
  res.json({ results: result.rows });
});

app.get("/products/:id", async (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    res.sendStatus(400);
    return;
  }

  const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    res.sendStatus(404);
    return;
  }

  res.json(result.rows[0]);
});

app.post("/products", async (req, res) => {
  const error = validarProducto(req.body);

  if (error !== null) {
    res.status(400).send(error);
    return;
  }

  const result = await db.query(
    "INSERT INTO products (name, price, image) VALUES ($1, $2, $3) RETURNING *",
    [req.body.name, Number(req.body.price), req.body.image]
  );

  res.status(201).json(result.rows[0]);
});

app.put("/products/:id", async (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    res.sendStatus(400);
    return;
  }

  const error = validarProducto(req.body);

  if (error !== null) {
    res.status(400).send(error);
    return;
  }

  const result = await db.query(
    "UPDATE products SET name = $1, price = $2, image = $3 WHERE id = $4 RETURNING *",
    [req.body.name, Number(req.body.price), req.body.image, id]
  );

  if (result.rowCount === 0) {
    res.sendStatus(404);
    return;
  }

  res.json(result.rows[0]);
});

app.delete("/products/:id", async (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    res.sendStatus(400);
    return;
  }

  const result = await db.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

  if (result.rowCount === 0) {
    res.sendStatus(404);
    return;
  }

  res.json(result.rows[0]);
});

app.listen(port, () => {
  console.log(`Backend levantado en http://localhost:${port}`);
});
