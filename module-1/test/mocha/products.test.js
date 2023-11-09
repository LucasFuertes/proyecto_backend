import assert from "assert";
import * as ProductService from "../../src/services/products.service.js";

describe("Testing del servicio Products", async () => {
  //PENDIENTE: Resolver tardanza de 2 segundos
  await it("Testeando respuesta de lectura de productos. Debe devolver un array", async () => {
    const filters = { limit: 5, page: 1, order: "asc", query: "" };
    const list = await ProductService.getAllProducts({ ...filters });
    assert.strictEqual(typeof list.products, "Array");
  });
});
