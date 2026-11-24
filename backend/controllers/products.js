import express from "express";
import { editProduct, getProduct, getProducts, newProduct, removeProduct } from "../db/products.js";

export const router = express.Router();

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

router.get("/", async (req, res) => {
  const products = await getProducts();
  res.json({ results: products });
});

router.get("/:id", async (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    res.sendStatus(400);
    return;
  }

  const product = await getProduct(id);

  if (product === undefined) {
    res.sendStatus(404);
    return;
  }

  res.json(product);
});

router.post("/", async (req, res) => {
  const error = validarProducto(req.body);

  if (error !== null) {
    res.status(400).send(error);
    return;
  }

  const product = await newProduct(req.body.name, Number(req.body.price), req.body.image);

  res.status(201).json(product);
});

router.put("/:id", async (req, res) => {
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

  const product = await editProduct(id, req.body.name, Number(req.body.price), req.body.image);

  if (product === undefined) {
    res.sendStatus(404);
    return;
  }

  res.json(product);
});

router.delete("/:id", async (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    res.sendStatus(400);
    return;
  }

  const product = await removeProduct(id);

  if (product === undefined) {
    res.sendStatus(404);
    return;
  }

  res.json(product);
});
