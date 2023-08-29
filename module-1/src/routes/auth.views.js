import { Router } from "express";
import passport from "passport";

export const authManager = Router();

authManager.get(
  "/github",
  passport.authenticate("loginGithub", { scope: ["user:email"] }),
  (req, res) => {}
);

authManager.get("/login", passport.authenticate("loginGithub"), (req, res) => {
  req.session.user = req.user;
  if (!req.session.user) res.redirect("/api/sessions/login");
  res.redirect("/products");
});
