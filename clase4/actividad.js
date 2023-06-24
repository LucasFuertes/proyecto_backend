import fs from "fs";

const date = new Date();
const hora = date.toLocaleTimeString();
const fecha = date.toLocaleDateString();
const fyh = `Fecha de hoy: ${fecha}  Hora actual: ${hora}`;
const path = "./fyh.txt";

fs.writeFile(path, fyh, (error) => {
  if (error) return console.log(error);
});

fs.readFile(path, "utf-8", (error, result) => {
  if (error) return console.log(error);

  console.log(`Info: ${result}`);
});
