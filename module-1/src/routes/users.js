import { Router } from "express";
import UserManager from "../dao/mongo/userManager.js";

const admin = new UserManager();
const usersRouter = Router();

const logged = (req, res, next) => {
  if (req.session.user) return res.redirect("/products");
  next();
};

const notLogged = (req, res, next) => {
  if (!req.session.user) return res.redirect("/api/sessions/login");
  next();
};

usersRouter.get("/login", logged, async (req, res) => {
  res.render("login");
});

usersRouter.post("/login", async (req, res) => {
  try {
    const { firstName, password } = req.body;
    const user = await admin.getUser(firstName, password);
    if (!user) {
      return res.redirect("/api/sessions/login");
    } else {
      delete user.email;
      delete user.password;
      req.session.user = user;
      console.log(req.session);
      res.redirect("/products");
    }
  } catch (e) {
    res.status(503).send({ error: e });
  }
});

usersRouter.get("/register", logged, (req, res) => {
  res.render("register");
});

usersRouter.post("/register", async (req, res) => {
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

usersRouter.get("/logout", notLogged, (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/api/sessions/login");
  });
});

export default usersRouter;
