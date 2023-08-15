import { Router } from "express";
import CartManager from "../dao/mongo/cartManager.js";

const buyer = new CartManager();
const cartsRouter = Router();

// ENDPOINTS MODIFICADOS CON MONGO
cartsRouter.get("/", async (req, res) => {
  const carts = await buyer.getCarts();
  res.send(carts);
});

cartsRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await buyer.getCartById(cid);
  res.send(cart);
});

cartsRouter.post("/", async (req, res) => {
  const cart = await buyer.createCart();
  res.send(cart);
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await buyer.addProductToCart(cid, pid);
  res.send(cart);
});

cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const status = await buyer.removeProductFromCart(cid, pid);
  res.send(status);
});

cartsRouter.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  const status = await buyer.removeAllProductsFromCart(cid);
  res.send(status);
});

cartsRouter.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const newQuantity = req.body;
  const update = await buyer.updateQuantity(cid, pid, newQuantity);
  res.send(update);
});

// ENDPOINTS POR MODIFICAR
cartsRouter.put("/:cid", async (req, res) => {});

export default cartsRouter;
