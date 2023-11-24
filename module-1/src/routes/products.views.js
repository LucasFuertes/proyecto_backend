import { Router } from "express";
import { notLogged } from "../utils/redirection.js";
import {
  onlyAdmin,
  onlyPremium,
} from "../utils/middlewares/auth.middleware.js";
import * as ProductService from "../services/products.service.js";

const prodsRouterRender = Router();

prodsRouterRender.get("/", async (req, res) => {
  let userExist = false;
  const { limit = 5, page = 1, order, query } = req.query;
  const status = await ProductService.getAllProducts({
    limit,
    page,
    order,
    query,
  });

  console.log("//////Existe?///////");
  console.log(req.user);
  // console.log(status);
  if (req.user) userExist = true;

  res.render("catalog", {
    status: status.products,
    userStatus: userExist,
    isUser: !userExist,
  });
});

prodsRouterRender.get(
  "/realtimeproducts",
  onlyAdmin,
  onlyPremium,
  async (req, res) => {
    const products = await ProductService.getAllProducts();
    res.render("realTimeProducts", { products: products });
  }
);

prodsRouterRender.post("/", async (req, res) => {
  const newProduct = req.body;
  const result = await ProductService.postNewProduct(newProduct);
  res.redirect("/products");
});

export default prodsRouterRender;
