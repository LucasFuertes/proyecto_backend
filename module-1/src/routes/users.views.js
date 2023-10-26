import { Router } from "express";
import passport from "passport";
import { logged, notLogged } from "../utils/redirection.js";
import transport from "../utils/mailing.js";
import * as UserService from "../services/users.service.js";

const usersRouterRender = Router();

usersRouterRender.get("/", logged, async (req, res) => {
  res.render("login");
});

usersRouterRender.get("/register", logged, (req, res) => {
  res.render("register");
});

usersRouterRender.get("/recoverPassword", (req, res) => {
  res.render("recover");
});

usersRouterRender.get("/newPassword", (req, res) => {
  res.render("password");
});

usersRouterRender.get("/logout", notLogged, (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
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

// RECUPERAR CONTRASEÑA: En proceso...
usersRouterRender.post("/emailRecover", async (req, res) => {
  const email = req.body.email;
  const mailBody = `<h1>¡Buenos días!</h1>
                  <p>Hemos recibido su solicitud para recuperar su contraseña. Lamentablemente no podemos recuperarla, 
                  pero si cambiarla. Presione el siguiente botón para redirigirlo a otra página</p>
                  <a href="http://localhost:8080/newPassword" target="_BLANK">Cambiar contraseña</a>`;
  const msg = await transport.sendMail({
    from: "Unknown user",
    to: `User <${email}>`,
    subject: "Cambio de contraseña",
    html: mailBody,
    text: "Soy un mensaje :v",
  });
  console.log(msg);
  res.send("¡Correo enviado!");
});

export default usersRouterRender;
