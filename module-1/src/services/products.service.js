import ProductDAO from "../dao/mongo/product.dao.js";
import CustomError from "../utils/customError.js";
import enumError from "../utils/enumError.js";
import {
  newProductError,
  getProductError,
  getProductsError,
} from "../utils/generateCauseError.js";

const productDAO = new ProductDAO();

export const getAllProducts = async ({ limit, page, order, query }) => {
  let sortOpcion;
  if (order == "asc") {
    sortOpcion = { price: 1 };
  } else if (order == "desc") {
    sortOpcion = { price: -1 };
  }
  let products;
  if (!query) {
    products = await productDAO.find({ limit, page, sortOpcion });
  } else {
    products = await productDAO.findWithFilters({
      limit,
      page,
      sortOpcion,
      query,
    });
  }
  if (!products) {
    CustomError.createError({
      message: "CANNOT GET PRODUCTS",
      cause: getProductsError(),
      name: "Get products error",
      code: enumError.DATABASE_ERROR,
    });
  }
  const result = {
    error: false,
    msg: "¡Productos encontrados!",
    products: products.docs,
  };
  return result;
};

export const getProductById = async (pid) => {
  const product = await productDAO.findById(pid);
  let result;
  if (!product) {
    CustomError.createError({
      message: "CANNOT GET PRODUCT",
      cause: getProductError(pid),
      name: "Get product error",
      code: enumError.DATABASE_ERROR,
    });
  } else {
    result = {
      error: false,
      msg: "Producto encontrado por ID",
      product: product,
    };
  }
  return result;
};

export const postNewProduct = async (newProduct) => {
  if (
    !newProduct.title ||
    !newProduct.description ||
    !newProduct.price ||
    !newProduct.code ||
    !newProduct.stock ||
    !newProduct.category
  ) {
    CustomError.createError({
      message: "CANNOT NEW PRODUCT",
      cause: newProductError(newProduct),
      name: "New product error",
      code: enumError.USER_INPUT_ERROR,
    });
  } else {
    const product = await productDAO.create(newProduct);
    const result = {
      error: false,
      msg: "Producto creado exitosamente",
      info: product,
    };
    return result;
  }
};

export const putUpdateProduct = async (id, data) => {
  try {
    if (data._id || data._id == false) {
      const result =
        "Se ha detectado un campo ID, actuaizacion anulada. Por favor, vuelva a enviar los datos sin dicho campo";
      return result;
    } else {
      const update = await productDAO.update(id, data);
      const updatedProduct = await productDAO.findById(id);
      const result = {
        error: false,
        msg: "¡Producto actualizado!",
        status: update,
        info: updatedProduct,
      };
      return result;
    }
  } catch (e) {
    const result = {
      error: true,
      msg: "Ha ocurrido un error al intentar actualizar el producto",
      info: e,
    };
    return result;
  }
};

export const deleteProductById = async (id) => {
  try {
    const erasedProduct = await productDAO.findById(id);
    const elimination = await productDAO.delete(id);
    const result = {
      error: false,
      msg: "Producto eliminado por ID",
      status: elimination,
      removedProduct: erasedProduct,
    };
    return result;
  } catch (e) {
    const result = {
      error: true,
      msg: "Error, no se ha podido eliminar el producto",
      info: e,
    };
    return result;
  }
};
