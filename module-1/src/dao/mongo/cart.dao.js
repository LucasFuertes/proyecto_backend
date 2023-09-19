import cartModel from "../models/cart.schema.js";

export default class CartDAO {
  constructor() {}

  find = async () => {
    return await cartModel.find();
  };

  findById = async (id) => {
    return await cartModel.findById(id);
  };

  create = async () => {
    return await cartModel.insertMany();
  };

  update = async (id, data) => {
    return await cartModel.updateOne({ _id: id }, data);
  };
}
