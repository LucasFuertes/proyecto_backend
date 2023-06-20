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

    if (product.stock == undefined) {
      console.log("Hay un campo vacío");
    } else {
      console.log("Se agregó con éxito");
      this.products.push(product);
    }
  };

  getProduct = () => {
    return console.log(this.products);
  };

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }
}

const productList = new ProductManager();
productList.addProduct(
  "Arroz",
  "Descripcion de arroz",
  200,
  "https://www.mayoristanet.com/media/catalog/product/cache/7c7e7e8fca0426f106cb3e3371a80f9c/A/0/A08356.jpg",
  346543
);

productList.addProduct(
  "Harina",
  "Descripcion de harina",
  300,
  "https://www.argensend.com/wp-content/uploads/2020/09/00253696.jpg",
  346543,
  70
);

productList.getProduct();
