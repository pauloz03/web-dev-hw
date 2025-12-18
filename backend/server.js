// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Order } from "./order.js";

dotenv.config();

const app = express();

// CORS: allow requests from your frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}));
app.use(express.json());

// MenuItem schema & model
const MenuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String
});
const MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema, "menuItems");

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected:", mongoose.connection.db.databaseName);

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections in DB:", collections.map(c => c.name));

    // Seed menuItems if empty
    const count = await MenuItem.countDocuments();
    if (count === 0) {
      console.log("menuItems collection is empty, seeding data...");
      const items = [
        { name: "Fish Stew", price: 15.5, img: "IMG_3951.jpg" },
        { name: "Breaded Shrimp", price: 13.99, img: "IMG_3948.jpg" },
        { name: "Sailor Rice", price: 14.99, img: "IMG_3950.jpg" },
        { name: "Sea Soup", price: 11.99, img: "IMG_3952.jpg" }
      ];
      await MenuItem.insertMany(items);
      console.log("menuItems seeded!");
    } else {
      console.log(`menuItems collection already has ${count} items.`);
    }
  })
  .catch(err => console.error("MongoDB connection error:", err));

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

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
