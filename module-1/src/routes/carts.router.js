import { Router } from "express";
import * as CartController from "../controllers/carts.controller.js";

const cartsRouter = Router();

cartsRouter.get("/", CartController.GETAllCarts);

cartsRouter.get("/:cid", CartController.GETCartById);

cartsRouter.post("/", CartController.POSTNewCart);

cartsRouter.post("/:cid/products/:pid", CartController.POSTAddProduct);

cartsRouter.delete("/:cid/products/:pid", CartController.DELETERemoveProduct);

cartsRouter.delete("/:cid", CartController.DELETEAllProducts);

cartsRouter.put("/:cid/products/:pid", CartController.PUTQuantity);

export default cartsRouter;
