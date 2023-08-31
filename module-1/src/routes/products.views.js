import { Router } from "express";
import ProductManager from "../dao/mongo/productManager.js";
const manager = new ProductManager();

const prodsRouterRender = Router();

const notLogged = (req, res, next) => {
  if (!req.user) return res.redirect("/api/sessions/login");
  next();
};

prodsRouterRender.get("/", notLogged, async (req, res) => {
  const { firstName, lastName } = req.user;
  const { limit = 5, page = 1, order, query } = req.query;
  const status = await manager.getProducts({ limit, page, order, query });
  res.render("home", {
    productsList: status.products,
    firstName,
    lastName,
  });
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
