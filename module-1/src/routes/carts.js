import { Router } from "express";
import CartManager from "../dao/cartManager.js";
import cartModel from "../dao/models/cart.schema.js";

const buyer = new CartManager("./db/carts.json");
const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
  const cart = await buyer.createCart();
  const dbCart = await cartModel.insertMany();
  res.send({ msg: cart, dbCart });
});

cartsRouter.get("/", async (req, res) => {
  const dbCart = await cartModel.find();
  res.send({ msg: "¡Carritos encontrados!", dbCart });
});

cartsRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await buyer.getCartById(cid);
  const dbCart = await cartModel.findById(cid);
  res.send({ msg: "Producto encontrado por ID", dbCart });
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await buyer.addProductToCart(cid, pid);
  res.send({ msg: cart });
});

export default cartsRouter;
