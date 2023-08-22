import userModel from "../models/user.schema.js";

export default class UserManager {
  constructor() {}

  registerUser = async (newUser) => {
    console.log(newUser);
    const register = await userModel.insertMany(newUser);
    if (!register) {
      return false;
    } else {
      return true;
    }
  };

  getUser = async (username, password) => {
    const user = await userModel.findOne(username);
    if (user.password != password) {
      return false;
    } else {
      return user;
    }
  };
}
