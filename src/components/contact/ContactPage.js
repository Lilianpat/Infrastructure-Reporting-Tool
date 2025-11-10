import React, { useState, useEffect } from 'react';
import '../../styles/contact.css';

const ContactPage = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input focus effects
  useEffect(() => {
    const inputs = document.querySelectorAll('.contact-input');
    
    const focusFunc = function() {
      let parent = this.parentNode;
      parent.classList.add("focus");
    };

    const blurFunc = function() {
      let parent = this.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    };

    inputs.forEach(input => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);
    });

    // Cleanup
    return () => {
      inputs.forEach(input => {
        input.removeEventListener("focus", focusFunc);
        input.removeEventListener("blur", blurFunc);
      });
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNavigation = (page) => {
    if (props.onNavigate) {
      props.onNavigate(page);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using StaticForms API as in your original code
      const response = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessKey: 'bdca8147-fc75-472d-8044-8bb8457c3938',
          ...formData
        })
      });

      if (response.ok) {
        // Show success message
        alert("Your message has been received! We will get back to you shortly.");
        
        // Wait 2 seconds and navigate back to auth
        setTimeout(() => {
          handleNavigation('auth');
        }, 2000);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        alert("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav>
        <div className="nav_header">
          <div className="nav_logo">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavigation('auth'); }}>
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

          {/* Mobile Menu Button */}
          <div className="nav_menu_btn" id="menu-btn" onClick={toggleMenu}>
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line`}></i>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className={`nav_links ${isMenuOpen ? 'open' : ''}`} id="nav-links">
          <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavigation('auth'); }}>Home</a></li>
          <li><a href="#reports" onClick={(e) => e.preventDefault()}>Reports</a></li>
          <li><a href="#contact" onClick={(e) => e.preventDefault()}>Contact Us</a></li>
          <li><a href="#auth" onClick={(e) => { e.preventDefault(); handleNavigation('auth'); }}>Login/Register</a></li>
        </ul>
      </nav>

      {/* Main Content Section */}
      <div className="contact-container">
        <span className="big-circle"></span>

        <div className="contact-form-wrapper">
          {/* Contact Information */}
          <div className="contact-info">
            <h3 className="contact-title">Get in touch with InfraWatch</h3>
            <p className="contact-text">
              We are InfraWatch
            </p>

            {/* Contact Details */}
            <div className="info">
              <div className="information">
                <div className="contact-icon" style={{ 
                  backgroundColor: '#1abc9c', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px'
                }}>📍</div>
                <p>University of Nigeria, Nsukka</p>
              </div>
              <div className="information">
                <div className="contact-icon" style={{ 
                  backgroundColor: '#1abc9c', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px'
                }}>✉️</div>
                <p>patrick.lilianobuzor@gmail.com</p>
              </div>
              <div className="information">
                <div className="contact-icon" style={{ 
                  backgroundColor: '#1abc9c', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px'
                }}>📞</div>
                <p>234-9037-549-226</p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="social-media">
              <p>Connect with us :</p>
              <div className="social-icons">
                <a href="https://www.facebook.com/LilianOnonyelum" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com/leelyhanpat" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/lilian-obuzor/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://x.com/lilian_obuzor" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="contact-form-section">
            <span className="circle one"></span>
            <span className="circle two"></span>

            <form className="contact-form" onSubmit={handleSubmit}>
              <h3 className="contact-title">Contact Us</h3>

              <div className="input-container">
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="contact-input" 
                  required 
                />
                <label>Fullname</label>
                <span>Fullname</span>
              </div>

              <div className="input-container">
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="contact-input" 
                  required 
                />
                <label>Email</label>
                <span>Email</span>
              </div>

              <div className="input-container">
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="contact-input" 
                  required 
                />
                <label>Phone</label>
                <span>Phone</span>
              </div>

              <div className="input-container textarea">
                <textarea 
                  name="message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="contact-input" 
                  required
                ></textarea>
                <label>Message</label>
                <span>Message</span>
              </div>

              <button 
                type="submit" 
                className="contact-btn" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;