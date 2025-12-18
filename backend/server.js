// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Order } from "./order.js";

dotenv.config();

const app = express();

// CORS: allow requests only from your frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "*" 
}));
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// MenuItem schema & model
const MenuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String
});
const MenuItem = mongoose.model("MenuItem", MenuItemSchema, "menuItems");

// GET /api/menu
app.get("/api/menu", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve menu items" });
  }
});

// POST /api/orders
app.post("/api/orders", async (req, res) => {
  try {
    const { items, total, customerName, customerMail } = req.body;

    if (!items || items.length === 0) return res.status(400).json({ message: "Cart is empty" });
    if (!customerName || customerName.trim() === "") return res.status(400).json({ message: "Customer name is required" });
    if (!customerMail || customerMail.trim() === "") return res.status(400).json({ message: "Customer email is required" });

    const order = new Order({ items, total, customerName, customerMail });
    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
