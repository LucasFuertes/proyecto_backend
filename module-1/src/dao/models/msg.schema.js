import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
});

const msgModel = mongoose.model("messages", msgSchema);

export default msgModel;
