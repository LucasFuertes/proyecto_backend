import { Router } from "express";
import ProductManager from "../dao/productManager.js";
import productModel from "../dao/models/product.schema.js";

const manager = new ProductManager("../db/products.json");

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await manager.getProducts();
  const dbProducts = await productModel.find();

  if (limit) {
    const productLimit = products.slice(0, limit);
    res.send(productLimit);
  } else {
    res.send(dbProducts);
  }
});

productsRouter.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await manager.getProductById(pid);
  res.send(product);
});

productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  if (newProduct.id) {
    res.send({
      msg: "Campo ID detectado. Por favor, vuelva a subir el producto sin el ID",
    });
  } else {
    const result = await manager.addProduct(newProduct);
    res.send({ msg: result });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const updatedData = req.body;
  if (updatedData.id || updatedData.id == false) {
    res.status(502).send({
      error: true,
      msg: "Campo ID no admitido. No se puede actualizar o eliminar el ID",
    });
  } else {
    await manager.updateProduct(pid, updatedData);
    res.send({ msg: "¡Producto actualizado!" });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  await manager.deleteProduct(pid);
  res.send({ msg: "Producto borrado" });
});

export default productsRouter;
