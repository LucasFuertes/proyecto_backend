import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: undefined,
  },
  password: {
    type: String,
    default: "",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("find", function () {
  this.populate("cart");
});

userSchema.pre("findOne", function () {
  this.populate("cart");
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
