import productModel from "../models/product.schema.js";

export default class ProductDAO {
  constructor() {}

  find = async ({ limit, page, sortOpcion }) => {
    return await productModel.paginate({}, { limit, page, sort: sortOpcion });
  };

  // Nota: el parametro "query", por ahora, hará referencia al elemento "title" de los productos
  findWithFilters = async ({ limit, page, sortOpcion, query }) => {
    return await productModel.paginate(
      { title: query },
      { limit, page, sort: sortOpcion }
    );
  };

  findById = async (id) => {
    return await productModel.findById(id);
  };

  create = async (product) => {
    return await productModel.create(product);
  };

  update = async (id, element) => {
    return await productModel.updateOne({ _id: id }, { $set: element });
  };

  delete = async (id) => {
    return await productModel.deleteOne({ _id: id });
  };
}
