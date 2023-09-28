import { Router } from "express";
import passport from "passport";
import { logged, notLogged } from "../utils/redirection.js";

const usersRouterRender = Router();

usersRouterRender.get("/", logged, async (req, res) => {
  res.render("login");
});
usersRouterRender.get("/register", logged, (req, res) => {
  res.render("register");
});

usersRouterRender.post(
  "/",
  passport.authenticate("login", {
    successRedirect: "/products",
    failureRedirect: "/",
  }),
  async (req, res) => {}
);

usersRouterRender.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/products",
    failureRedirect: "/register",
  }),
  async (req, res) => {}
);

usersRouterRender.get("/logout", notLogged, (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

export default usersRouterRender;
