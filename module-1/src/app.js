import fs from "fs/promises";
import express from "express";
import productsRouter from "./routes/products.router.js";
import prodsRouterRender from "./routes/products.views.js";
import cartsRouter from "./routes/carts.router.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { Server as HTTPServer } from "http";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import viewsRouter from "./routes/views.router.js";
import InitLocalStrategy from "./config/passport.config.js";
import passport from "passport";
import { usersRouter } from "./routes/users.router.js";
import { mocks } from "./routes/mocks.router.js";
import ErrorHandlerMw from "./utils/middlewares/error.middleware.js";
import winston from "./utils/winston.js";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import swaggerConfig from "./config/swagger.js";

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
app.use(winston);
app.use(
  session({
    secret: "87312yr92743e8r34",
    resave: false,
    saveUninitialized: false,
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

const specs = swaggerJSDoc(swaggerConfig);
app.use("/api/docs", serve, setup(specs));

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/auth", usersRouter);
app.use("/products", prodsRouterRender);
app.use("/mockingproducts", mocks);

app.use(ErrorHandlerMw);
httpServer.listen(8080, () => console.log("Server conectado!"));
