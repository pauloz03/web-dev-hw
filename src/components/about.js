// src/components/About.jsx..
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../style.css";
import backImage from "../assets/images/back.jpg";

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
              <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>

          <div className="hamburger" onClick={toggleMenu}>
            ☰
          </div>
        </nav>
      </header>

      <section className="about">
        <h1>About Us</h1>

        <p>
          Founded in <span className="highlight">Ecuador</span>,{" "}
          <strong>The Ceviches of the Rumiñahui</strong> has become famous for
          its authentic flavors made with{" "}
          <span className="highlight">fresh, local ingredients</span>. Known for
          bringing people together over traditional dishes, we are now thrilled
          to share the taste of Ecuador as we expand to{" "}
          <span className="highlight">New York</span> and beyond.
        </p>

        <p>
          Our mission is simple:{" "}
          <span className="highlight">deliver authentic Ecuadorian cuisine</span>{" "}
          with warm hospitality.
        </p>

        <img src={backImage} alt="Restaurant background" />
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
