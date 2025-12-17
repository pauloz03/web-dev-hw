// models/Order.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, default: "pending" },
    customerName: { type: String }, 
    customerMail: { type: String },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
