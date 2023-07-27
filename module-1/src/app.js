import express from "express";
import productsRouter from "./routes/products.js";
import prodsRouterRender from "./routes/products.views.js";
import cartsRouter from "./routes/carts.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { Server as SocketServer } from "socket.io";

const app = express();
app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/products", prodsRouterRender);

const appServer = app.listen(8080, () => console.log("¡Server conectado!"));

const io = new SocketServer(appServer);

io.on("connection", (socket) => {
  console.log(`Cliente se ha conectado con el ID ${socket.id}`);

  socket.on("newProduct", (data) => {
    console.log("Renderizando...");
    io.emit("products", data);
  });
});
