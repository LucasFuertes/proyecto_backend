import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: Array,
  },
  code: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  // status: true,
  category: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model("products", productSchema);

export default productModel;
