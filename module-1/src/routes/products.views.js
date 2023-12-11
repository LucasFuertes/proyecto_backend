import { Router } from "express";
import { notLogged } from "../utils/redirection.js";
import {
  onlyAdmin,
  onlyPremium,
} from "../utils/middlewares/auth.middleware.js";
import * as ProductService from "../services/products.service.js";

const prodsRouterRender = Router();

prodsRouterRender.get("/", async (req, res) => {
  let sessionExist = false;
  let infoUser = false;
  const { limit = 5, page = 1, order, query } = req.query;
  const status = await ProductService.getAllProducts({
    limit,
    page,
    order,
    query,
  });

  console.log("//////Existe?///////");
  console.log(req.user);

  // console.log("//////Elemento de user?/////");
  // console.log(username || "nada");
  // console.log(role || "nada");
  // console.log(role == "user");
  // console.log(status);

  if (req.user) {
    sessionExist = true;
    infoUser = true;

    const { username, role } = req.user;

    res.render("catalog", {
      isNotSession: sessionExist,
      isUser: role == "user",
      isPremium: role == "premium",
      isAdmin: role == "admin",
      infoUser,
      username,
      role,
      productsList: status.products,
      notAdmin: role != "admin",
    });
  } else {
    res.render("catalog", {
      isNotSession: sessionExist,
      infoUser,
      productsList: status.products,
      notAdmin: false,
    });
  }
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
