import userModel from "../models/user.schema.js";

export default class UserManager {
  constructor() {}

  registerUser = async (newUser) => {
    const register = await userModel.insertMany(newUser);
    if (!register) {
      return false;
    } else {
      return true;
    }
  };

  getUser = async (username, password) => {
    try {
      const user = await userModel.findOne(username);
      if (!user) return false;
      if (user.password != password) {
        return false;
      } else {
        return user;
      }
    } catch {
      return false;
    }
  };
}
