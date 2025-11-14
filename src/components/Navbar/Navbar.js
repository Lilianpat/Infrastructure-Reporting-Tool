import React, { useState } from "react";
import "../../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle navigation between pages
  const handleNavigation = (page) => {
    if (page === "auth") {
      window.location.href = "/login"; // or your auth route
    } else if (page === "contact") {
      window.location.href = "/contact";
    } else if (page === "user-dashboard") {
      window.location.href = "/user-dashboard";
    } else {
      console.log("Unknown navigation:", page);
    }
  };

  return (
    <nav className="home-nav">
      <div className="nav-logo">
        <a href="#home" onClick={(e) => e.preventDefault()}>
          <div className="logo-box">IW</div>
          <span className="logo-text">InfraWatch</span>
        </a>
      </div>

      <div className="nav-menu-btn" onClick={toggleMenu}>
        <i className={`ri-${isMenuOpen ? "close" : "menu"}-line`}></i>
      </div>

      <ul className={`home-nav-links ${isMenuOpen ? "open" : ""}`}>
  <li>
    <Link to="/">Home</Link>
  </li>

  <li>
    <Link to="/reports">Reports</Link>
  </li>

  <li>
    <Link to="/contact">Contact Us</Link>
  </li>

  <li>
    <Link to="/login">Login/Register</Link>
  </li>

  <li>
    <Link to="/dashboard">Dashboard</Link>
  </li>
</ul>

    </nav>
  );
};

export default Navbar;
