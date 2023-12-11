import adminModel from "../models/admin.schema.js";

export default class AdminDAO {
  constructor() {}

  create = async (data) => {
    return await adminModel.insertMany(data);
  };

  findById = async (id) => {
    return await adminModel.findById(id);
  };

  delete = async (id) => {
    return await adminModel.deleteOne(id);
  };
}
