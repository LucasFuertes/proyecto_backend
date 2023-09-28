import { Router } from "express";
import { notLogged } from "../utils/redirection.js";
import * as ProductService from "../services/products.service.js";

const prodsRouterRender = Router();

prodsRouterRender.get("/", notLogged, async (req, res) => {
  const { firstName, lastName } = req.user;
  const { limit = 5, page = 1, order, query } = req.query;
  const status = await ProductService.getAllProducts({
    limit,
    page,
    order,
    query,
  });
  res.render("home", {
    productsList: status.products,
    firstName,
    lastName,
  });
});

prodsRouterRender.get("/realtimeproducts", async (req, res) => {
  const products = await ProductService.getAllProducts();
  res.render("realTimeProducts", { products: products });
});

prodsRouterRender.post("/", async (req, res) => {
  const newProduct = req.body;
  const result = await ProductService.postNewProduct(newProduct);
  res.redirect("/products");
});

export default prodsRouterRender;
