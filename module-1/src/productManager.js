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

// INSTANCIA DE LA CLASE
// const productList = new ProductManager("./products.json");

/* EJEMPLOS DE AGREGAR PRODUCTO */
// await productList.addProduct(
//   "Arroz",
//   "Descripcion de arroz",
//   200,
//   "https://www.mayoristanet.com/media/catalog/product/cache/7c7e7e8fca0426f106cb3e3371a80f9c/A/0/A08356.jpg",
//   346543,
//   60
// );

// await productList.addProduct(
//   "Harina",
//   "Descripcion de harina",
//   300,
//   "https://www.argensend.com/wp-content/uploads/2020/09/00253696.jpg",
//   234567,
//   70
// );

// await productList.addProduct(
//   "Pure de tomate",
//   "Descripcion de pure de tomate",
//   200,
//   "https://atomoconviene.com/atomo-ecommerce/64238-large_default/pure-de-tomates-arcor---530-grs-.jpg",
//   821395,
//   100
// );

/* EJEMPLO DE ACTUALIZAR PRODUCTO */
// const newProductData = { price: 500 };
// await productList.updateProduct(3, newProductData);

/* EJEMPLO DE ELIMINAR PRODUCTO */
// await productList.deleteProduct(3);

/* EJEMPLO DE VER PRODUCTO */
// const getProducts = await productList.getProductById(6);
// console.log(getProducts);
