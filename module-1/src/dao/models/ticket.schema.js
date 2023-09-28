import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  purchase_datetime: {
    type: Date,
  },
  amount: {
    type: Number,
  },
  purchaser: {
    type: String,
  },
});

const ticketModel = mongoose.model("tickets", ticketSchema);
export default ticketModel;
