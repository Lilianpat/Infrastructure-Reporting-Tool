import React, { useState, useEffect } from 'react';
import '../../styles/home.css';

const HomePage = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (page) => {
    if (props.onNavigate) {
      props.onNavigate(page);
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  const handleGetStarted = () => {
    handleNavigation('auth');
  };

  // Inline background style - this is the most reliable way in React
  const containerStyle = {
    minHeight: '100vh',
    background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                 url('/images/home-images/troy-mortier-AieHOEGMKmk-unsplash.jpg')`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    color: '#ffffff',
    position: 'relative'
  };

  return (
    <div className="home-container" style={containerStyle}>
      {/* Navigation */}
      <nav className="home-nav">
        <div className="nav_logo">
          <a href="#home" onClick={(e) => e.preventDefault()}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              backgroundColor: '#fff', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#1abc9c'
            }}>
              IW
            </div>
            <span>InfraWatch</span>
          </a>
        </div>

        <div className="nav_menu_btn" onClick={toggleMenu}>
          <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line`}></i>
        </div>

        <ul className={`home-nav_links ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="#home" className="active" onClick={(e) => e.preventDefault()}>Home</a></li>
          <li><a href="#reports" onClick={(e) => e.preventDefault()}>Reports</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation('contact'); }}>Contact Us</a></li>
          <li><a href="#auth" onClick={(e) => { e.preventDefault(); handleNavigation('auth'); }}>Login/Register</a></li>
        </ul>
      </nav>

      {/* Hero Section - Full Screen */}
      <section className="hero_section">
        <div className="hero_container">
          <div className="hero_content">
            <div className="secondary_header fade-in">
              <div className="line"></div>
              <h2>INFRASTRUCTURE WATCH</h2>
              <div className="line"></div>
            </div>
            
            <h1 className="fade-in">
              Report Infrastructure Issues
            </h1>
            
            <div className="hero_subtitle fade-in">Anywhere, Anytime</div>
            
            <p className="fade-in">
              Report infrastructure issues in your community with ease! Our platform enables you to quickly report potholes,
              broken streetlights, and other public infrastructure problems, helping local authorities take prompt action.
            </p>
            
            <div className="fade-in">
              <button className="hero_btn" onClick={handleGetStarted}>
                Get Started <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features_section">
        <div className="features_container">
          <div className="feature_card fade-in">
            <div className="feature_icon">
              <i className="ri-map-pin-line"></i>
            </div>
            <h3>Easy Reporting</h3>
            <p>Quickly report infrastructure issues with photos and location data. Simple forms make reporting effortless.</p>
          </div>

          <div className="feature_card fade-in">
            <div className="feature_icon">
              <i className="ri-eye-line"></i>
            </div>
            <h3>Real-time Tracking</h3>
            <p>Monitor the status of your reports in real-time. See when issues are being addressed and resolved.</p>
          </div>

          <div className="feature_card fade-in">
            <div className="feature_icon">
              <i className="ri-trophy-line"></i>
            </div>
            <h3>Gamified Experience</h3>
            <p>Earn points and badges for your contributions. Make community service engaging and rewarding.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer_content">
          <div className="social_media">
            <a href="https://www.instagram.com/leelyhanpat" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/lilian-obuzor/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://x.com/lilian_obuzor" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.facebook.com/LilianOnonyelum" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
          <p className="copyright">&copy; 2025 InfraWatch. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;