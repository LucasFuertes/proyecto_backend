console.log("Hellooooooooo");
const socket = io();

function productCreated() {
  let form = document.getElementById("productsForm");
  socket.emit("newProduct", form.value);
}

socket.on("products", (data) => {
  let list = document.getElementById("productList");
  let product = `<div>
                  <b>Producto {{this.id}}</b>
                  <ul>
                    <li>Nombre: {{this.title}}</li>
                    <li>Descripcion: {{this.description}}</li>
                    <li>Precio: {{this.price}}</li>
                  </ul>
                  <button id={{this.id}} onclick="productDeleted()">Eliminar producto</button>
                </div>`;
  list.append(product);
});
