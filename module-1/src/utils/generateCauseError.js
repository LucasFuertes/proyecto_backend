export const newProductError = (product) => {
  return `The product you want to create has incomplete fields.
    * title: to be a string received: ${typeof product.title}
    * description: to be a string received: ${typeof product.description}
    * price: to be a string received: ${typeof product.price}
    * code: to be a string received: ${typeof product.code}
    * stock: to be a string received: ${typeof product.stock} 
    * category: to be a string received: ${typeof product.category}`;
};

export const getProductError = (id) => {
  return `The requested product does not exist or the id is incorrect.
  * ID received: ${id}`;
};

export const getProductsError = () => {
  return `Could not find any product in the database or they do not exist.`;
};
