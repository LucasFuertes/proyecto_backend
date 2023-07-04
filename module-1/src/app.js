import express from "express";
import ProductManager from "./productManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
const manager = new ProductManager("./products.json");

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  const products = await manager.getProducts();
  const productLimit = [];

  if (limit) {
    for (let i = 0; i < +limit; i++) {
      productLimit.push(products[i]);
    }
    res.send(productLimit);
  } else {
    res.send(products);
  }
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await manager.getProductById(pid);
  res.send(product);
});

app.listen(8080, () => {
  console.log("¡Server conectado!");
});
