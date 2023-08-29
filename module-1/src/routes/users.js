import { Router } from "express";
// import UserManager from "../dao/mongo/userManager.js";
import passport from "passport";

// const admin = new UserManager();
const usersRouter = Router();

const logged = (req, res, next) => {
  if (req.user) return res.redirect("/products");
  next();
};

const notLogged = (req, res, next) => {
  if (!req.user) return res.redirect("/api/sessions/login");
  next();
};

usersRouter.get("/login", logged, async (req, res) => {
  res.render("login");
});

usersRouter.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/products",
    failureRedirect: "/login",
  }),
  async (req, res) => {}
);

usersRouter.get("/register", logged, (req, res) => {
  res.render("register");
});

usersRouter.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/products",
    failureRedirect: "/register",
  }),
  async (req, res) => {}
);

usersRouter.get("/logout", notLogged, (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/api/sessions/login");
  });
});

export default usersRouter;
