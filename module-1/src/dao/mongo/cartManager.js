import cartModel from "../models/cart.schema.js";

export default class CartManager {
  constructor(path) {
    this.carts = [];
  }

  createCart = async () => {
    try {
      const cart = await cartModel.insertMany();
      const result = { msg: "¡Carrito creado!", cartInfo: cart };
      return result;
    } catch (e) {
      const result = { msg: "Error, no se pudo crear el carrito", error: e };
      return result;
    }
  };

  getCarts = async () => {
    try {
      const carts = await cartModel.find();
      const result = { msg: "¡Carritos encontrados!", carts: carts };
      return result;
    } catch (e) {
      const result = {
        msg: "Error, no se ha podido encontrar los carritos",
        error: e,
      };
      return result;
    }
  };

  getCartById = async (cartId) => {
    try {
      const cart = await cartModel.findById(cartId);
      const result = { msg: "¡Carrito encontrado por ID!", cart: cart };
      return result;
    } catch (e) {
      const result = {
        msg: "Error, no se ha podido encontrar el carrito solicitado",
        error: e,
      };
      return result;
    }
  };

  addProductToCart = async (cartId, productId) => {
    try {
      const cart = await cartModel.findOne({ _id: cartId });
      cart.products.push({ product: productId });
      await cartModel.updateOne({ _id: cart._id }, cart);
      const cartUpdated = await cartModel.findOne({ _id: cart._id });
      const result = {
        msg: "¡Producto agregado al carrito!",
        update: cartUpdated,
      };
      return result;
    } catch (e) {
      const result = {
        msg: "Error, no se ha podido agregar el producto solicitado al carrito",
        error: e,
      };
      return result;
    }
  };

  removeProductFromCart = async (cartId, productId) => {
    try {
      const cart = await cartModel.findOne({ _id: cartId });
      const filtration = cart.products.filter(
        (prods) => prods.product._id != productId
      );
      cart.products = filtration;
      await cartModel.updateOne({ _id: cart._id }, cart);
      const productRemoved = await cartModel.findOne({ _id: cart._id });
      const result = {
        msg: "Producto removido con éxito",
        update: productRemoved,
      };
      return result;
    } catch (e) {
      const result = {
        msg: "Error, no se ha podido remover el producto solicitado",
        error: e,
      };
      return result;
    }
  };

  removeAllProductsFromCart = async (cartId) => {
    try {
      const cart = await cartModel.findOne({ _id: cartId });
      cart.products = [];
      await cartModel.updateOne({ _id: cart._id }, cart);
      const cartEmpty = await cartModel.findOne({ _id: cart._id });
      const result = { msg: "Carrito vaciado", update: cartEmpty };
      return result;
    } catch (e) {
      const result = { msg: "Error, no se pudo vaciar el carrito", error: e };
      return result;
    }
  };

  updateQuantity = async (cartId, productId, newQuantity) => {
    try {
      const cart = await cartModel.findOne({ _id: cartId });
      const indexProduct = cart.products.findIndex(
        (prod) => prod.product._id == cart._id
      );
      const selectedProduct = cart.products.find(
        (prod) => prod.product._id == productId
      );
      selectedProduct.quantity =
        selectedProduct.quantity + newQuantity.quantity;
      cart.products[indexProduct] = selectedProduct;
      await cartModel.updateOne({ _id: cart._id }, cart);
      const updatedCart = await cartModel.findOne({ _id: cart._id });
      const result = {
        msg: "¡Cantidad del producto actualizada!",
        cartInfo: updatedCart,
      };
      return result;
    } catch (e) {
      const result = {
        msg: "Error, no se pudo actualizar la cantidad del producto solicitado",
        error: e,
      };
      return result;
    }
  };
}
