import { Router } from "express";
import ProductManager from "../dao/mongo/productManager.js";
const manager = new ProductManager();

const prodsRouterRender = Router();

const notLogged = (req, res, next) => {
  if (!req.session.user) return res.redirect("/login");
  next();
};

prodsRouterRender.get("/", notLogged, async (req, res) => {
  const { firstName, lastName } = req.session.user;
  const { limit = 5, page = 1, order, query } = req.query;
  const status = await manager.getProducts({ limit, page, order, query });
  res.render("home", { productsList: status.products.docs });
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
