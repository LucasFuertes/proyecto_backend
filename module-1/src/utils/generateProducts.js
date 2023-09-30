import { faker } from "@faker-js/faker";

export default function generateProducts() {
  return {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.number.int({ min: 1, max: 100 }),
  };
}
