import fs from "fs/promises";

export default class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
    this.productsList = "./db/products.json";
  }

  createCart = async () => {
    try {
      const file = await fs.readFile(this.path, "utf-8");
      this.carts = JSON.parse(file);

      const cart = {
        id: this.carts.length + 1,
        products: [],
      };

      if (this.carts.find((crt) => crt.id >= cart.id)) {
        const lastCart = this.carts.pop();
        cart.id = lastCart.id + 1;
        this.carts.push(lastCart);
      }

      this.carts.push(cart);
      await fs.writeFile(this.path, JSON.stringify(this.carts));
      return "¡Carrito creado!";
    } catch (error) {
      console.error(`Error: ${error}`);
      return "Error al crear el carrito";
    }
  };

  getCartById = async (cartId) => {
    try {
      const file = await fs.readFile(this.path, "utf-8");
      this.carts = JSON.parse(file);

      const cartFind = this.carts.find((crt) => crt.id == cartId);
      if (cartFind) {
        return cartFind;
      } else {
        return "No se ha encontrado el carrito solicitado";
      }
    } catch (error) {
      console.error(`Error: ${error}`);
      return "Error al intentar encontrar el carrito";
    }
  };

  addProductToCart = async (cartId, productId) => {
    try {
      const fileCarts = await fs.readFile(this.path, "utf-8");
      this.carts = JSON.parse(fileCarts);
      const cart = this.carts.find((crt) => crt.id == cartId);
      const indexCart = this.carts.findIndex((crt) => crt.id == cartId);

      const fileProducts = await fs.readFile(this.productsList, "utf-8");
      const products = JSON.parse(fileProducts);
      const selectedProduct = products.find((prod) => prod.id == productId);

      const objProduct = { product: selectedProduct.id, quantity: 1 };

      if (cart.products.find((prod) => prod.product == objProduct.product)) {
        const indexProd = cart.products.findIndex(
          (prod) => prod.product == objProduct.product
        );
        const product = cart.products[indexProd];
        product.quantity = product.quantity + objProduct.quantity;
        cart.products[indexProd] = product;

        this.carts[indexCart] = cart;
        await fs.writeFile(this.path, JSON.stringify(this.carts));
        return "El producto ya existe, la cantidad ha sido actualizada";
      } else {
        cart.products.push(objProduct);
        this.carts[indexCart] = cart;
        await fs.writeFile(this.path, JSON.stringify(this.carts));
        return "¡El producto ha sido agregado al carrito!";
      }
    } catch {
      return "Error al intentar agregar un producto al carrito";
    }
  };
}
