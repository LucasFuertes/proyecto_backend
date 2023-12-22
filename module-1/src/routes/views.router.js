import { Router } from "express";
import { logged, notLogged } from "../utils/redirection.js";
import transport from "../utils/mailing.js";
import * as ProductService from "../services/products.service.js";
import {
  blockAdmin,
  blockUser,
  onlyUser,
} from "../utils/middlewares/auth.middleware.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
  let sessionExist = false;
  if (req.user) {
    const { role } = req.user;
    sessionExist = true;

    res.render("home", {
      isNotSession: sessionExist,
      isUser: role == "user",
      isPremium: role == "premium",
      isAdmin: role == "admin",
    });
  } else {
    res.render("home", { isNotSession: sessionExist });
  }
});

viewsRouter.get("/products", async (req, res) => {
  let sessionExist = false;
  let infoUser = false;
  const { limit = 5, page = 1, order, query } = req.query;
  const status = await ProductService.getAllProducts({
    limit,
    page,
    order,
    query,
  });

  console.log("//////Existe?///////");
  console.log(req.user);

  // console.log("//////Elemento de user?/////");
  // console.log(username || "nada");
  // console.log(role || "nada");
  // console.log(role == "user");
  // console.log(status);

  if (req.user) {
    sessionExist = true;
    infoUser = true;

    const { username, role } = req.user;

    res.render("catalog", {
      isNotSession: sessionExist,
      isUser: role == "user",
      isPremium: role == "premium",
      isAdmin: role == "admin",
      infoUser,
      username,
      role,
      productsList: status.products,
      notAdmin: role != "admin",
    });
  } else {
    res.render("catalog", {
      isNotSession: sessionExist,
      infoUser,
      productsList: status.products,
      notAdmin: false,
    });
  }
});

viewsRouter.get("/login", logged, async (req, res) => {
  res.render("login");
});

viewsRouter.get("/register", logged, (req, res) => {
  res.render("register");
});

viewsRouter.get("/cart", notLogged, blockAdmin, (req, res) => {
  const { role } = req.user;

  res.render("cart", {
    isUser: role == "user",
    isPremium: role == "premium",
  });
});

viewsRouter.get("/premium", notLogged, onlyUser, (req, res) => {
  res.render("premium");
});

viewsRouter.get("/newProduct", notLogged, blockUser, async (req, res) => {
  const { role } = req.user;

  res.render("newProduct", {
    isPremium: role == "premium",
    isAdmin: role == "admin",
  });
});

viewsRouter.get("/updateProduct", notLogged, blockUser, async (req, res) => {
  const { role } = req.user;

  res.render("updateProduct", {
    isPremium: role == "premium",
    isAdmin: role == "admin",
  });
});

// RECUPERAR CONTRASEÑA: En proceso...
viewsRouter.get("/recoverPassword", (req, res) => {
  res.render("recover");
});

viewsRouter.get("/newPassword", (req, res) => {
  res.render("password");
});

viewsRouter.post("/emailRecover", async (req, res) => {
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

export default viewsRouter;
