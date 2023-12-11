import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
  },
});

const adminModel = mongoose.model("admin", adminSchema);

export default adminModel;
