import __dirname from "../dirname.js";

const swaggerConfig = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API ECOMMERCE",
      description: "Tienda de articulos",
    },
  },
  apis: [__dirname + "/docs/*.yaml"],
};

export default swaggerConfig;
