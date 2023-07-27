import { Router } from "express";
import ProductManager from "../productManager.js";
const manager = new ProductManager("./db/products.json");

export const prodsRouterRender = Router();

prodsRouterRender.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await manager.getProducts();

  if (limit) {
    const productLimit = products.slice(0, limit);
    res.render("home", { products: productLimit });
  } else {
    res.render("home", { products: products });
  }
});

prodsRouterRender.get("/realtimeproducts", async (req, res) => {
  const products = await manager.getProducts();
  res.render("realTimeProducts", { products: products });
});

prodsRouterRender.post("/", async (req, res) => {
  const newProduct = req.body;
  const result = await manager.addProduct(newProduct);
  res.redirect("/products");
});

export default prodsRouterRender;
