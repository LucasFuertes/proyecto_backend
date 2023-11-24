import { Router } from "express";
import * as CartController from "../controllers/carts.controller.js";

const cartsRouter = Router();

cartsRouter.post("/", CartController.POSTNewCart);

cartsRouter.get("/", CartController.GETAllCarts);

cartsRouter.get("/:cid", CartController.GETCartById);

cartsRouter.post("/:cid/products/:pid", CartController.POSTAddProduct);

cartsRouter.delete("/:cid/products/:pid", CartController.DELETERemoveProduct);

cartsRouter.delete("/:cid", CartController.DELETEAllProducts);

cartsRouter.put("/:cid/products/:pid", CartController.PUTQuantity);

cartsRouter.get("/:cid/purchase", CartController.GETTicket);

export default cartsRouter;
