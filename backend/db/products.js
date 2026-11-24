import { db } from "./pool.js";

/// Returns every row of the products table.
export async function getProducts() {
  const result = await db.query("SELECT * FROM products ORDER BY id");
  return result.rows;
}

/// id: id of the product in the products table. Must be already validated.
export async function getProduct(id) {
  const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    return undefined;
  }

  return result.rows[0];
}

export async function newProduct(name, price, image) {
  const result = await db.query(
    "INSERT INTO products (name, price, image) VALUES ($1, $2, $3) RETURNING *",
    [name, price, image]
  );

  return result.rows[0];
}

export async function removeProduct(id) {
  const result = await db.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

  if (result.rowCount === 0) {
    return undefined;
  }

  return result.rows[0];
}

export async function editProduct(id, name, price, image) {
  const result = await db.query(
    "UPDATE products SET name = $1, price = $2, image = $3 WHERE id = $4 RETURNING *",
    [name, price, image, id]
  );

  if (result.rowCount === 0) {
    return undefined;
  }

  return result.rows[0];
}
