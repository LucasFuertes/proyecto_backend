import { Router } from "express";
import * as ProductService from "../services/products.service.js";

const prodsRouterRender = Router();

prodsRouterRender.post("/", async (req, res) => {
  const newProduct = req.body;
  const result = await ProductService.postNewProduct(newProduct);
  res.redirect("/products");
});

export default prodsRouterRender;
