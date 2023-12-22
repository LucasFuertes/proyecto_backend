import { Router } from "express";
import passport from "passport";
import { getUserByName, updateRole } from "../services/users.service.js";
import { notLogged } from "../utils/redirection.js";

export const usersRouter = Router();

// Registrarse:
usersRouter.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/",
    failureRedirect: "/register",
  }),
  async (req, res) => {}
);

// Inicio de sesión:
usersRouter.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  async (req, res) => {}
);

// Iniciar sesión con Github:
usersRouter.get(
  "/github",
  passport.authenticate("loginGithub", { scope: ["user:email"] }),
  (req, res) => {}
);

usersRouter.get(
  "/login",
  passport.authenticate("loginGithub", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

// Cerrar sesión:
usersRouter.post("/signout", notLogged, (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

// Cambiar contraseña:

// Cambiar rol de user a premium:
usersRouter.get("/prem", async (req, res) => {
  const { username } = req.user;
  const user = await getUserByName(username);
  user.role = "premium";
  await updateRole(user._id, user);
  res.redirect("/products");
});
