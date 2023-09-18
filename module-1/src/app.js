import fs from "fs/promises";
import express from "express";
import productsRouter from "./routes/products.router.js";
import prodsRouterRender from "./routes/products.views.js";
import cartsRouter from "./routes/carts.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { Server as SocketServer } from "socket.io";
import { Server as HTTPServer } from "http";
import mongoose from "mongoose";
import { msgsRouterRender } from "./routes/chat.views.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import usersRouter from "./routes/users.js";
import InitLocalStrategy from "./config/passport.config.js";
import passport from "passport";
import { authManager } from "./routes/auth.views.js";

const app = express();

const httpServer = HTTPServer(app);

const dbConnection = mongoose.connect(
  `mongodb+srv://lucasfuertesmr:p75HJ00ZHRkRofxm@ecommerce.etxylxe.mongodb.net/ecommerce?retryWrites=true&w=majority`
);
dbConnection
  .then(() => console.log("¡Base de datos Mongo conectada!"))
  .catch((e) => console.error(e));

app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "87312yr92743e8r34",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: `mongodb+srv://lucasfuertesmr:p75HJ00ZHRkRofxm@ecommerce.etxylxe.mongodb.net/ecommerce?retryWrites=true&w=majority`,
      ttl: 3600,
    }),
    ttl: 3600,
  })
);

InitLocalStrategy();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", usersRouter);
app.use("/products", prodsRouterRender);
app.use("/chat", msgsRouterRender);
app.use("/api/auth", authManager);

const io = new SocketServer(httpServer);

app.use((req, res, next) => {
  req.io = io;
  next();
});

const msg = [{ user: "UserDefault", message: "¡Bienvenido!" }];
io.on("connection", (socket) => {
  console.log(`Cliente se ha conectado con el ID ${socket.id}`);

  socket.emit("historial", msg);

  socket.on("newProduct", async (data) => {
    try {
      const file = await fs.readFile("./db/products.json", "utf-8");
      const products = JSON.parse(file);
      const productFound = products.find((prods) => prods.title == data.title);
      if (productFound) {
        console.log("Renderizando...");
        socket.broadcast.emit("products", productFound);
      } else {
        console.error("No se pudo renderizar el producto creado");
      }
    } catch {
      console.log(data);
      console.error("Error, no se pudo encontrar el producto");
    }
  });
});

httpServer.listen(8080, () => console.log("Server conectado!"));
