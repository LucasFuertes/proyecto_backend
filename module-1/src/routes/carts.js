import { Router } from "express";
import CartManager from "../cartManager.js";
const buyer = new CartManager("./db/carts.json");
const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
  const cart = await buyer.createCart();
  res.send({ msg: cart });
});

cartsRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await buyer.getCartById(cid);
  res.send(cart);
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await buyer.addProductToCart(cid, pid);
  res.send({ msg: cart });
});

export default cartsRouter;
