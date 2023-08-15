import { Router } from "express";
import ProductManager from "../dao/mongo/productManager.js";

const manager = new ProductManager();

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  const { limit = 5, page = 1, order, query } = req.query;
  const products = await manager.getProducts({ limit, page, order, query });
  res.send(products);
});

productsRouter.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await manager.getProductById(pid);
  res.send(product);
});

productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  const result = await manager.addProduct(newProduct);
  res.send(result);
});

productsRouter.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const newData = req.body;
  const product = await manager.updateProduct(pid, newData);
  res.send(product);
});

productsRouter.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const status = await manager.deleteProduct(pid);
  res.send(status);
});

export default productsRouter;
