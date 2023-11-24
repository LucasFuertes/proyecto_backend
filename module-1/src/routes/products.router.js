import { Router } from "express";
import * as ProductController from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.post("/", ProductController.POSTNewProduct);

productsRouter.get("/", ProductController.GETAllProducts);

productsRouter.get("/:pid", ProductController.GETProductById);

productsRouter.put("/:pid", ProductController.PUTUpdateProduct);

productsRouter.delete("/:pid", ProductController.DELETEProductById);

export default productsRouter;
