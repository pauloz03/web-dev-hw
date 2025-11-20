// src/components/Contact.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../style.css";

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  function handleSubmit(e) {
    e.preventDefault();
    alert("Message sent! (This is a placeholder)");
  }

  return (
    <>
      <header>
        <div className="logo">🍽️ Ceviches of the Rumiñahui</div>

        <nav id="navbar">
          <ul className={menuOpen ? "show" : ""}>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu">Menu</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="hamburger" onClick={toggleMenu}>
            ☰
          </div>
        </nav>
      </header>

      <section className="contact">
        <h1>Contact Us</h1>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send</button>
        </form>

        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255347.55999694936!2d-78.70450716747848!3d-0.14453872608932064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d58fff9ac7b59d%3A0xf4714afd8ebd9c23!2sLos%20Cebiches%20de%20la%20Rumi%C3%B1ahui.%20Los%20%C3%81lamos!5e0!3m2!1ses!2sus!4v1761685760837!5m2!1ses!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Restaurant Location"
          ></iframe>
        </div>
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
