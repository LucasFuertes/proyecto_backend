import { Router } from "express";
import passport from "passport";
import { getUserByName, updateRole } from "../services/users.service.js";

export const authManager = Router();

authManager.get(
  "/github",
  passport.authenticate("loginGithub", { scope: ["user:email"] }),
  (req, res) => {}
);

// Iniciar sesión con Github:
authManager.get(
  "/login",
  passport.authenticate("loginGithub", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

authManager.get("/prem", async (req, res) => {
  const { username } = req.user;
  const user = await getUserByName(username);
  user.role = "premium";
  await updateRole(user._id, user);
  // console.log(user);
  res.redirect("/products");
});
