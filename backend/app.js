import express from "express";
import cors from "cors";
import { router as productsRouter } from "./controllers/products.js"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Backend levantado en http://localhost:${port}`);
});
