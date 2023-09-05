import userModel from "../models/user.schema.js";
import bcrypt from "bcrypt";

export default class UserManager {
  constructor() {}

  getUserById = async (id) => {
    const user = await userModel.findById(id);
    return user;
  };

  getUserByName = async (username) => {
    const user = await userModel.findOne({ username: username });
    return user;
  };

  getUserByEmail = async (email) => {
    const user = await userModel.findOne({ email: email });
    return user;
  };

  registerUser = async (newUser) => {
    try {
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      const register = await userModel.insertMany(newUser);
      return register;
    } catch {
      return false;
    }
  };

  loginUser = async (username, password) => {
    try {
      const user = await userModel.findOne({ username });
      if (!user) return false;
      const result = await bcrypt.compare(password, user.password);
      return result ? user.toObject() : false;
    } catch {
      return false;
    }
  };
}
