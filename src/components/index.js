// src/components/Index.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../style.css";

// Import gallery images
import img3946 from "../assets/images/IMG_3946.jpg";
import img3942 from "../assets/images/IMG_3942.jpg";
import img3943 from "../assets/images/IMG_3943.jpg";
import img3945 from "../assets/images/IMG_3945.jpg";
import img3947 from "../assets/images/IMG_3947.jpg";
import img3949 from "../assets/images/IMG_3949.jpg";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const galleryImages = [img3946, img3942, img3943, img3945, img3947, img3949];

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
              <NavLink to="/about">About</NavLink>
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

      <section className="hero">
        <h1>Welcome to Ceviches of the Rumiñahui</h1>
        <p>Authentic flavors, directly from the Ecuador all the way to NYC.</p>
      </section>

      <section className="gallery">
        <h2>Our Specialties</h2>
        <div className="slider">
          {galleryImages.map((img, index) => (
            <img
              key={index}
              src={img}
              className="slide active"
              alt={`Specialty ${index + 1}`}
            />
          ))}
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
        <p>Open daily: 10AM – 8PM</p>
      </footer>
    </>
  );
}
