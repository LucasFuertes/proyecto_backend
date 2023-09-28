import { Router } from "express";
import * as ProductController from "../controllers/products.controller.js";
// import { onlyAdmin } from "../utils/redirection.js";

const productsRouter = Router();

productsRouter.get("/", ProductController.GETAllProducts);

productsRouter.get("/:pid", ProductController.GETProductById);

productsRouter.post("/", ProductController.POSTNewProduct);

productsRouter.put("/:pid", ProductController.PUTUpdateProduct);

productsRouter.delete("/:pid", ProductController.DELETEProductById);

export default productsRouter;
