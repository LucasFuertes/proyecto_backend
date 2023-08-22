import { Router } from "express";

const usersRouterRender = Router();

const logged = (req, res, next) => {
  if (req.session.user) return res.redirect("/products");
  next();
};

usersRouterRender.get("/login", logged, (req, res) => {
  res.render("login");
});

usersRouterRender.get("/register", logged, (req, res) => {
  res.render("register");
});

export default usersRouterRender;
