import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const products = [
    {
        "id": 1,
        "name": "Teclado Mecánico",
        "price": 89.99,
        "image": "https://picsum.photos/seed/keyboard/400/300"
    },
    {
        "id": 2,
        "name": "Mouse Inalámbrico",
        "price": 29.5,
        "image": "https://picsum.photos/seed/mouse/400/300"
    },
    {
        "id": 3,
        "name": "Taza de Café",
        "price": 12,
        "image": "https://picsum.photos/seed/mug/400/300"
    },
    {
        "id": 4,
        "name": "Mochila",
        "price": 54.99,
        "image": "https://picsum.photos/seed/backpack/400/300"
    },
    {
        "id": 5,
        "name": "Lámpara de Escritorio",
        "price": 34.75,
        "image": "https://picsum.photos/seed/lamp/400/300"
    },
    {
        "id": 6,
        "name": "Auriculares",
        "price": 119,
        "image": "https://picsum.photos/seed/headphones/400/300"
    },
    {
        "id": 7,
        "name": "Monitor 27 Pulgadas",
        "price": 249.99,
        "image": "https://picsum.photos/seed/monitor/400/300"
    },
    {
        "id": 8,
        "name": "Silla de Oficina",
        "price": 179,
        "image": "https://picsum.photos/seed/chair/400/300"
    },
    {
        "id": 9,
        "name": "Botella Térmica",
        "price": 22.9,
        "image": "https://picsum.photos/seed/bottle/400/300"
    },
    {
        "id": 10,
        "name": "Zapatillas Running",
        "price": 95.5,
        "image": "https://picsum.photos/seed/sneakers/400/300"
    }
];

app.get('/products', (req, res) => {
  res.json({
    "results": products
  });
});

app.get('/products/:id', (req, res) => {
  const product_id = Number(req.params.id);

  if (isNaN(product_id)) {
    res.sendStatus(400);
    return;
  }

  if (!Number.isInteger(product_id)) {
    res.sendStatus(400);
    return;
  }

  // !(product_id >= 1 && product_id < products.length)
  // !(product_id >= 1) || !(product_id < products.length)
  // product_id < 1 || product_id >= products.length

  // product es { "id": X, "name": "Y", ...}
  // o...
  // product es undefined
  const product = products.find((p) => {
    return p.id === product_id
  });

  if (product === undefined) {
    res.sendStatus(404);
    return;
  }

  res.json(product);
});

app.post('/products', (req, res) => {
  console.log(req.body);

  if (req.body.name === undefined || req.body.price === undefined || req.body.image === undefined) {
    res.status(400).send("name, price e image son obligatorios");
    return;
  }

  const price = Number(req.body.price);

  if (isNaN(price)) {
    res.status(400).send("price debe ser un número");
    return;
  }

  if (price <= 0) {
    res.status(400).send("price debe ser mayor a 0");
    return;
  }

  if (req.body.name.length < 3) {
    res.status(400).send("name debe tener al menos 3 caracteres");
    return;
  }

  const id = products[products.length - 1].id + 1;

  const new_product = {
    "id": id,
    "name": req.body.name,
    "price": req.body.price,
    "image": req.body.image
  };

  products.push(new_product);

  res.status(201).json(new_product);
});

app.listen(port, () => {
  console.log(`Backend levantado en http://localhost:${port}`);
});
