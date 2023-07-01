import fs from "fs/promises";

export default class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const file = await fs.readFile(this.path, "utf-8");
    this.products = JSON.parse(file);

    const product = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    if (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock
    ) {
      if (!this.products.find((prod) => prod.code === product.code)) {
        this.products.push(product);
        await fs.writeFile(this.path, JSON.stringify(this.products));
      } else {
        console.log(`El código del producto ${title} ya existe`);
      }
    } else {
      console.log(`El producto ${title} lleva un campo vacío`);
    }
  };

  getProducts = async () => {
    this.products = await fs.readFile(this.path, "utf-8");
    return JSON.parse(this.products);
  };

  getProductById = async (id) => {
    const file = await fs.readFile(this.path, "utf-8");
    this.products = JSON.parse(file);

    const productFind = this.products.find((product) => product.id == id);

    if (productFind) {
      return productFind;
    } else {
      return "No se ha encontrado el producto solicitado";
    }
  };

  updateProduct = async (id, element) => {
    const file = await fs.readFile(this.path, "utf-8");
    this.products = JSON.parse(file);

    const index = this.products.findIndex((prods) => prods.id === id);
    if (index !== -1) {
      const updatedProduct = { ...this.products[index], ...element };
      this.products[index] = updatedProduct;
      await fs.writeFile(this.path, JSON.stringify(this.products));
      console.log("Producto actualizado correctamente");
    } else {
      console.log("No se ha encontrado el producto solicitado");
    }
  };

  deleteProduct = async (id) => {
    const file = await fs.readFile(this.path, "utf-8");
    this.products = JSON.parse(file);

    const deletedProduct = this.products.filter((prods) => prods.id !== id);
    await fs.writeFile(this.path, JSON.stringify(deletedProduct));
  };
}
