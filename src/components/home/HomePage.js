"use client"

import { useState, useEffect } from "react"
import '../../styles/home.css';
import Navbar from "../Navbar/Navbar";

const HomePage = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavigation = (page) => {
    if (props.onNavigate) {
      props.onNavigate(page)
    }
    setIsMenuOpen(false)
  }

  const handleGetStarted = () => {
    handleNavigation("auth")
  }

  const containerStyle = {
    minHeight: "100vh",
    background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                 url('/images/home-images/troy-mortier-AieHOEGMKmk-unsplash.jpg')`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    color: "#ffffff",
    position: "relative",
  }

  return (
    <div className="home-container" style={containerStyle}>
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="secondary-header fade-in">
              <div className="header-line"></div>
              <h2>INFRASTRUCTURE WATCH</h2>
              <div className="header-line"></div>
            </div>

            <h1 className="fade-in">Report Infrastructure Issues</h1>

            <div className="hero-subtitle fade-in">Anywhere, Anytime</div>

            <p className="fade-in">
              Report infrastructure issues in your community with ease! Our platform enables you to quickly report
              potholes, broken streetlights, and other public infrastructure problems, helping local authorities take
              prompt action.
            </p>

            <div className="fade-in">
              <button className="hero-btn" onClick={handleGetStarted}>
                Get Started <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-card fade-in">
            <div className="feature-icon">
              <i className="ri-map-pin-line"></i>
            </div>
            <h3>Easy Reporting</h3>
            <p>
              Quickly report infrastructure issues with photos and location data. Simple forms make reporting
              effortless.
            </p>
          </div>

          <div className="feature-card fade-in">
            <div className="feature-icon">
              <i className="ri-eye-line"></i>
            </div>
            <h3>Real-time Tracking</h3>
            <p>Monitor the status of your reports in real-time. See when issues are being addressed and resolved.</p>
          </div>

          <div className="feature-card fade-in">
            <div className="feature-icon">
              <i className="ri-trophy-line"></i>
            </div>
            <h3>Gamified Experience</h3>
            <p>Earn points and badges for your contributions. Make community service engaging and rewarding.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="social-media">
            <a
              href="https://www.instagram.com/leelyhanpat"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/lilian-obuzor/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://x.com/lilian_obuzor" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.facebook.com/LilianOnonyelum"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook"></i>
            </a>
          </div>
          <p className="copyright">&copy; 2025 InfraWatch. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
