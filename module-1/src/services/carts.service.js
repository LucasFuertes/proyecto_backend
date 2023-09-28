import CartDAO from "../dao/mongo/cart.dao.js";
import { CartDTO } from "../dto/cart.dto.js";
import ProductDAO from "../dao/mongo/product.dao.js";

const cartDAO = new CartDAO();
const productDAO = new ProductDAO();

export const getAllCarts = async () => {
  try {
    const carts = await cartDAO.find();
    const result = {
      error: false,
      msg: "¡Carritos encontrados!",
      info: carts,
    };
    return result;
  } catch (e) {
    const result = {
      error: true,
      msg: "Error, no se ha podido encontrar los carritos",
      info: e,
    };
    return result;
  }
};

export const getCartById = async (id) => {
  try {
    const cart = await cartDAO.findById(id);
    const result = {
      error: false,
      msg: "¡Carrito encontrado por ID!",
      info: cart,
    };
    return result;
  } catch (e) {
    const result = {
      error: true,
      msg: "Error, no se ha podido encontrar el carrito solicitado",
      info: e,
    };
    return result;
  }
};

export const postNewCart = async () => {
  try {
    const cart = await cartDAO.create();
    const result = { error: false, msg: "¡Carrito creado!", info: cart };
    return result;
  } catch (e) {
    const result = {
      error: true,
      msg: "Error, no se pudo crear el carrito",
      info: e,
    };
    return result;
  }
};

export const postAddProduct = async (cartId, productId) => {
  try {
    const cart = await cartDAO.findById(cartId);
    cart.products.push({ product: productId });
    await cartDAO.update(cart._id, cart);
    const cartUpdated = await cartDAO.findById(cart._id);
    const result = {
      error: false,
      msg: "¡Producto agregado al carrito!",
      update: cartUpdated,
    };
    return result;
  } catch (e) {
    const result = {
      error: true,
      msg: "Error, no se ha podido agregar el producto solicitado al carrito",
      info: e,
    };
    return result;
  }
};

export const deleteRemoveProduct = async (cartId, productId) => {
  try {
    const cart = await cartDAO.findById(cartId);
    const filtration = cart.products.filter(
      (prods) => prods.product._id != productId
    );
    cart.products = filtration;
    await cartDAO.update(cart._id, cart);
    const productRemoved = await cartDAO.findById(cart._id);
    const result = {
      error: false,
      msg: "Producto removido con éxito",
      update: productRemoved,
    };
    return result;
  } catch (e) {
    const result = {
      error: true,
      msg: "Error, no se ha podido remover el producto solicitado",
      info: e,
    };
    return result;
  }
};

export const deleteAllProducts = async (cartId) => {
  try {
    const cart = await cartDAO.findById(cartId);
    cart.products = [];
    await cartDAO.update(cart._id, cart);
    const cartEmpty = await cartDAO.findById(cart._id);
    const result = { error: false, msg: "Carrito vaciado", update: cartEmpty };
    return result;
  } catch (e) {
    const result = {
      error: true,
      msg: "Error, no se pudo vaciar el carrito",
      error: e,
    };
    return result;
  }
};

export const putQuantity = async (cartId, productId, newQuantity) => {
  try {
    const cart = await cartDAO.findById(cartId);
    const indexProduct = cart.products.findIndex(
      (prod) => prod.product._id == cart._id
    );
    const selectedProduct = cart.products.find(
      (prod) => prod.product._id == productId
    );
    selectedProduct.quantity = selectedProduct.quantity + newQuantity.quantity;
    cart.products[indexProduct] = selectedProduct;
    await cartDAO.update(cart._id, cart);
    const updatedCart = await cartDAO.findById(cart._id);
    const result = {
      error: false,
      msg: "¡Cantidad del producto actualizada!",
      info: updatedCart,
    };
    return result;
  } catch (e) {
    const result = {
      error: true,
      msg: "Error, no se pudo actualizar la cantidad del producto solicitado",
      info: e,
    };
    return result;
  }
};

export const getTicket = async (cartId) => {
  const cartUser = await cartDAO.findById(cartId);
  const cart = cartUser.toObject();
  let totalAmount = 0;
  let productsWithoutStock = [];
  cart.products.map(async (prods) => {
    if (prods.product.stock >= prods.quantity) {
      let updateStock = prods.product.stock - prods.quantity;
      await productDAO.update(prods.product._id, { stock: updateStock });
      totalAmount = totalAmount + prods.product.price;
    } else {
      let indexProduct = cart.products.findIndex((pr) => pr._id == prods._id);
      productsWithoutStock = cart.products.filter(
        (prod) => prod._id == prods._id
      );
      cart.products.splice(indexProduct, 1);
    }
  });
  const completedPurchase = new CartDTO(cart);
  return completedPurchase;
};
