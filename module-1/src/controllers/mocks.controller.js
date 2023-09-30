import generateProducts from "../utils/generateProducts.js";

export const GETFakeProducts = (req, res) => {
  const products = [];
  for (let index = 0; index < 100; index++) {
    products.push(generateProducts());
  }

  console.log(products.length);
  res.send(products);
};
