import UserDAO from "../dao/mongo/user.dao.js";
import bcrypt from "bcrypt";
import { GetUser } from "../dto/user.dto.js";

const userDAO = new UserDAO();

export const getUserById = async (userId) => {
  const user = await userDAO.findById(userId);
  return user;
};

export const getUserByName = async (username) => {
  const user = await userDAO.findByName(username);
  return user;
};

export const getUserByEmail = async (email) => {
  const user = await userDAO.findByEmail(email);
  return user;
};

export const registerUser = async (newUser) => {
  try {
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const register = await userDAO.create(newUser);
    return register;
  } catch {
    return false;
  }
};

export const loginUser = async (username, password) => {
  try {
    const dataUser = await userDAO.findByName(username);
    if (!dataUser) return false;
    const result = await bcrypt.compare(password, dataUser.password);
    return result ? dataUser.toObject() : false;
  } catch {
    return false;
  }
};
