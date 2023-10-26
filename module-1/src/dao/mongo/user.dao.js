import userModel from "../models/user.schema.js";

export default class UserDAO {
  constructor() {}

  findById = async (id) => {
    return await userModel.findById(id);
  };

  findByName = async (username) => {
    return await userModel.findOne({ username: username });
  };

  findByEmail = async (email) => {
    return await userModel.findOne({ email: email });
  };

  create = async (newUser) => {
    return await userModel.insertMany(newUser);
  };

  update = async (idUser, newData) => {
    return await "";
  };
}
