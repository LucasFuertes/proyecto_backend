console.log("Hellooooooooo");
const socket = io();

let form = document.getElementById("productsForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("newProduct", form.value);
});

socket.on("products", (data) => {
  let list = document.getElementById("productList");
  let containerProduct = document.createElement("div");
  containerProduct.innerHTML = `<b>Producto ${data.id}</b>
                                <ul>
                                  <li>Nombre: ${data.title}</li>
                                  <li>Descripcion: ${data.description}</li>
                                  <li>Precio: ${data.price}</li>
                                </ul>
                                <button id=${data.id} onclick="productDeleted()">Eliminar producto</button>`;
  list.append(containerProduct);
});
