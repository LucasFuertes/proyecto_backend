import { Router } from "express";
import passport from "passport";

export const authManager = Router();

authManager.get(
  "/github",
  passport.authenticate("loginGithub", { scope: ["user:email"] }),
  (req, res) => {}
);

authManager.get(
  "/login",
  passport.authenticate("loginGithub", {
    successRedirect: "/products",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);
