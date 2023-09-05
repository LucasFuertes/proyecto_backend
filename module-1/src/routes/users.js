import { Router } from "express";
import passport from "passport";
import { logged, notLogged } from "../utils/redirection.js";

const usersRouter = Router();

usersRouter.get("/login", logged, async (req, res) => {
  res.render("login");
});
usersRouter.get("/register", logged, (req, res) => {
  res.render("register");
});

usersRouter.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/products",
    failureRedirect: "/login",
  }),
  async (req, res) => {}
);

usersRouter.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/products",
    failureRedirect: "/register",
  }),
  async (req, res) => {}
);

usersRouter.get(
  "/current",
  passport.authenticate("current-user"),
  async (req, res) => {
    const user = req.user;
    if (!user) return res.send("No existe usuario loggeado");
    res.send(user);
  }
);

usersRouter.get("/logout", notLogged, (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/api/sessions/login");
  });
});

export default usersRouter;
