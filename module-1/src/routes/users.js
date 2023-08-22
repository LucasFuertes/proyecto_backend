import { Router } from "express";
import UserManager from "../dao/mongo/userManager.js";

const admin = new UserManager();
const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const user = await admin.getUser(username, password);
    if (!user) {
      return res.redirect("/login");
    } else {
      delete user.email;
      delete user.password;
      req.session.user = user;
      res.redirect("/products");
    }
  } catch (e) {
    res.status(503).send({ error: e });
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, age, password } = req.body;
    const user = await admin.registerUser({
      firstName,
      lastName,
      email,
      age,
      password,
    });
    console.log(user);
    res.send("¡Usuario registrado!");
  } catch (e) {
    res.status(503).send({ error: e });
  }
});

export default usersRouter;
