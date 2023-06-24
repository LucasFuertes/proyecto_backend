class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
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
      } else {
        console.log(`El código del producto ${title} ya existe`);
      }
    } else {
      console.log(`El producto ${title} lleva un campo vacío`);
    }
  };

  getProduct = () => {
    return console.log(this.products);
  };

  getProductById(id) {
    const productFind = this.products.find((product) => product.id === id);
    if (productFind) {
      return console.log(productFind);
    } else {
      return console.error("Not found");
    }
  }
}

const productList = new ProductManager();
productList.addProduct(
  "Arroz",
  "Descripcion de arroz",
  200,
  "https://www.mayoristanet.com/media/catalog/product/cache/7c7e7e8fca0426f106cb3e3371a80f9c/A/0/A08356.jpg",
  346543,
  60
);

productList.addProduct(
  "Harina",
  "Descripcion de harina",
  300,
  "https://www.argensend.com/wp-content/uploads/2020/09/00253696.jpg",
  234567,
  70
);

productList.addProduct(
  "Aceite",
  "Descripcion de aceite",
  30,
  "https://jumboargentina.vtexassets.com/arquivos/ids/427642-800-600?v=636495153112630000&width=800&height=600&aspect=true",
  876543,
  50
);

productList.getProductById(4);
