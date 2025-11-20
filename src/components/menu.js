// src/components/Menu.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../style.css";

// Import images from src/assets/images
import shrimpImg from "../assets/images/IMG_3948.jpg";
import fishStewImg from "../assets/images/IMG_3951.jpg";
import sailorRiceImg from "../assets/images/IMG_3950.jpg";
import seaSoupImg from "../assets/images/IMG_3952.jpg";
import kidsMealImg from "../assets/images/IMG_3953.jpg";

export default function Menu() {
  const [cart, setCart] = useState([]);

  const menuItems = [
    { id: 1, name: "Breaded Shrimp", price: 13.99, img: shrimpImg },
    { id: 2, name: "Fish Stew", price: 15.5, img: fishStewImg },
    { id: 3, name: "Sailor Rice", price: 14.99, img: sailorRiceImg },
    { id: 4, name: "Sea Soup", price: 11.99, img: seaSoupImg },
    { id: 5, name: "Kids Meal (Shrimp)", price: 6.5, img: kidsMealImg },
  ];

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }

  function removeFromCart(name) {
    setCart((prev) => prev.filter((i) => i.name !== name));
  }

  function clearCart() {
    setCart([]);
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <header>
        <div className="logo">🍽️ Ceviches of the Rumiñahui</div>

        <nav id="navbar">
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu" className="active">
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <section className="menu">
        <h1>Our Menu</h1>
        <div className="menu-items">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="item"
              onClick={() => addToCart(item)}
            >
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cart">
        <h2>Your Cart</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.name}>
              {item.name} x{item.quantity} - $
              {(item.price * item.quantity).toFixed(2)}{" "}
              <button onClick={() => removeFromCart(item.name)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: ${total.toFixed(2)}</p>
        <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
        <button className="continue-btn">Continue to Payment</button>
      </section>

      <footer>
        <p>
          Follow us on:{" "}
          <a href="https://www.facebook.com/LosCebichesdelaRuminahui.ec/?locale=es_LA">
            Facebook
          </a>{" "}
          |{" "}
          <a href="https://www.instagram.com/loscebichesdelaruminahui/?hl=es">
            Instagram
          </a>
        </p>
        <p>Open daily: 11AM – 10PM</p>
      </footer>
    </>
  );
}

