import express from "express";
import productsRouter from "./routes/products.js";
import prodsRouterRender from "./routes/products.views.js";
import cartsRouter from "./routes/carts.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
const app = express();
app.use(express.static("public"));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/products", prodsRouterRender);

app.listen(8080, () => {
  console.log("¡Server conectado!");
});
