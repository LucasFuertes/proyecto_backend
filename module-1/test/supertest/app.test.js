import { expect } from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost:8080/api/products`);

describe("Testeo de aplicación en proceso", () => {
  describe("Testeando módulo de productos", () => {
    let id = null;
    it("Creación de producto. Debe crear un objeto y devolverlo como respuesta", async () => {
      const newProduct = {
        title: "Arvejas",
        description: "Descripcion de arvejas",
        price: "300",
        thumbnail: [""],
        code: "998432",
        stock: "90",
        category: "Legumbres",
      };
      const response = await requester.post("/").send(newProduct);
      const { _body } = response;
      id = _body.info._id;
      expect(_body).to.be.a("object");
    });
    it("Lectura de producto. Debe leer un objeto y devolverlo como respuesta", async () => {
      const response = await requester.get("/" + id);
      const { _body } = response;
      expect(_body).to.be.a("object");
    });
    it("Lectura de productos. Debe leer un objeto de paginación de productos y devolverlo como respuesta", async () => {
      const response = await requester.get("/");
      const { _body } = response;
      expect(_body).to.be.a("object");
    });
    it("Actualización de producto. Debe buscar un objeto, cambiar datos y devolver el objeto actualizado como respuesta", async () => {
      const newDataProduct = { title: "Arv" };
      const response = await requester.put("/" + id).send(newDataProduct);
      const { _body } = response;
      expect(_body).to.be.a("object");
    });
    it("Eliminación de producto. Debe buscar, encontrar, y eliminar un objeto, para luego devolver un objeto info", async () => {
      const response = await requester.delete("/" + id);
      const { _body } = response;
      expect(_body).to.be.a("object");
    });
  });
});
