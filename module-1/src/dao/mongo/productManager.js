import productModel from "../models/product.schema.js";

export default class ProductManager {
  constructor() {}

  addProduct = async (product) => {
    try {
      if (product.id) {
        const result = {
          msg: "Campo ID detectado. Por favor, vuelva a subir el producto sin el ID",
        };
        return result;
      } else {
        const newProduct = await productModel.insertMany(product);
        const result = {
          msg: "Producto creado exitosamente",
          product: newProduct,
        };
        return result;
      }
    } catch (e) {
      const result = {
        msg: "Error, no se ha podido crear el producto",
        error: e,
      };
      return result;
    }
  };

  // Nota: el parametro "query", por ahora, hará referencia al elemento "title" de los productos
  getProducts = async ({ limit, page, order, query }) => {
    try {
      let sortOpcion;
      if (order == "asc") {
        sortOpcion = { price: 1 };
      } else if (order == "desc") {
        sortOpcion = { price: -1 };
      }
      let dbProducts;
      if (!query) {
        dbProducts = await productModel.paginate(
          {},
          { limit, page, sort: sortOpcion }
        );
      } else {
        dbProducts = await productModel.paginate(
          { title: query },
          { limit, page, sort: sortOpcion }
        );
      }
      const products = dbProducts.docs;
      const result = {
        msg: "¡Productos encontrados!",
        products,
      };
      return result;
    } catch (e) {
      const result = {
        msg: "Error, no se ha podido encontrar los productos",
        error: e,
      };
      return result;
    }
  };

  getProductById = async (id) => {
    try {
      const product = await productModel.findById(id);
      const result = { msg: "Producto encontrado por ID", product: product };
      return result;
    } catch (e) {
      const result = {
        msg: "Error, no se ha encontrado el producto solicitado",
        error: e,
      };
      return result;
    }
  };

  updateProduct = async (id, element) => {
    try {
      if (element._id || element._id == false) {
        const result =
          "Se ha detectado un campo ID, actuaizacion anulada. Por favor, vuelva a enviar los datos sin dicho campo";
        return result;
      } else {
        const update = await productModel.updateOne(
          { _id: id },
          { $set: element }
        );
        const updatedProduct = await productModel.findById(id);
        const result = {
          msg: "¡Producto actualizado!",
          status: update,
          product: updatedProduct,
        };
        return result;
      }
    } catch (e) {
      const result = {
        msg: "Error, no se ha podido actualizar el producto",
        error: e,
      };
      return result;
    }
  };

  deleteProduct = async (id) => {
    try {
      const erasedProduct = await productModel.findById(id);
      const elimination = await productModel.deleteOne({ _id: id });
      const result = {
        msg: "Producto eliminado por ID",
        status: elimination,
        removedProduct: erasedProduct,
      };
      return result;
    } catch (e) {
      const result = {
        msg: "Error, no se ha podido eliminar el producto",
        error: e,
      };
      return result;
    }
  };
}
