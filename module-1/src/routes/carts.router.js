import { Router } from "express";
import * as CartController from "../controllers/carts.controller.js";
import {
  blockAdmin,
  msgNotLogged,
} from "../utils/middlewares/auth.middleware.js";

const cartsRouter = Router();

// MAIN ROUTERS
cartsRouter.post("/", CartController.POSTNewCart);

cartsRouter.get("/", msgNotLogged, blockAdmin, CartController.GETAllCarts);

cartsRouter.put("/:cid/products/:pid", CartController.PUTQuantity);

cartsRouter.delete("/:cid", CartController.DELETEAllProducts);
// SECONDARY ROUTERS
cartsRouter.get("/:cid", CartController.GETCartById);

cartsRouter.post("/:cid/products/:pid", CartController.POSTAddProduct);

cartsRouter.delete("/:cid/products/:pid", CartController.DELETERemoveProduct);

cartsRouter.get("/:cid/purchase", CartController.GETTicket);

export default cartsRouter;
