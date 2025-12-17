import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../style.css";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(""); 

  useEffect(() => {
    fetch("http://localhost:3001/api/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Error:", err));
  }, []);

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

    // show notification
    setNotification(`${item.name} added to cart!`);
    setTimeout(() => setNotification(""), 2000); 
  }

  function decreaseQuantity(item) {
    setCart((prev) =>
      prev
        .map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }

  function removeFromCart(name) {
    setCart((prev) => prev.filter((i) => i.name !== name));
  }

  function clearCart() {
    setCart([]);
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function placeOrder() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const customerName = prompt("Please enter your name:");
    if (!customerName || customerName.trim() === "") {
      alert("Name is required to place an order.");
      return;
    }

    const customerMail = prompt("Please enter your email:");
    if (!customerMail || customerMail.trim() === "") {
      alert("Email is required for order confirmation.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total,
          customerName,
          customerMail,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Thanks ${customerName}! Your order has been placed.`);
        clearCart();
      } else {
        alert(data.message || "Error placing order");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  return (
    <>
      <header>
        <div className="logo">🍽️ Ceviches of the Rumiñahui</div>

        <nav id="navbar">
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/menu" className="active">Menu</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>
      </header>

      <section className="menu">
        <h1>Our Menu</h1>
        <div className="menu-items">
          {menuItems.map((item) => (
            <div
              key={item._id}
              className="item"
              onClick={() => addToCart(item)}
            >
              <img src={`/images/${item.img}`} alt={item.name} />
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cart">
        <h2>Your Cart</h2>

        {notification && <p className="notification">{notification}</p>}

        <ul>
          {cart.map((item) => (
            <li key={item.name}>
              {item.name} x{item.quantity} – $
              {(item.price * item.quantity).toFixed(2)}{" "}
              <button onClick={() => decreaseQuantity(item)}>-</button>{" "}
              <button onClick={() => addToCart(item)}>+</button>{" "}
              <button onClick={() => removeFromCart(item.name)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: ${total.toFixed(2)}</p>

        <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
        <button className="continue-btn" onClick={placeOrder}>Place Order</button>
      </section>

      <footer>
        <p>
          Follow us on:
          <a href="https://www.facebook.com/LosCebichesdelaRuminahui.ec/?locale=es_LA"> Facebook</a> |
          <a href="https://www.instagram.com/loscebichesdelaruminahui/?hl=es"> Instagram</a>
        </p>
        <p>Open daily: 11AM – 10PM</p>
      </footer>
    </>
  );
}
