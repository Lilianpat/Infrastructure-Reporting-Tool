import React, { useState } from 'react';
import '../../styles/auth.css';

const AuthPage = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Registration form state
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    registrationNumber: '',
    staffNumber: '',
    businessName: '',
    serviceType: '',
    department: ''
  });

  const toggleForms = () => {
    setIsActive(!isActive);
    setIsLogin(!isLogin);
  };

  const handleNavigation = (page) => {
    if (props.onNavigate) {
      props.onNavigate(page);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRoleSelect = (role) => {
    setRegisterData(prevState => ({
      ...prevState,
      role,
      // Clear role-specific fields when changing roles
      registrationNumber: '',
      staffNumber: '',
      businessName: '',
      serviceType: ''
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', loginData);const handleLoginSubmit = (e) => {
  e.preventDefault();

  const { email, password } = loginData;

  // TEMPORARY DUMMY LOGIN (Replace with API call later)
  if (email === "admin@infrawatch.com" && password === "admin123") {
    // Redirect to admin dashboard
    window.location.href = "/admin/dashboard";
    return;
  }

  if (email === "user@infrawatch.com" && password === "user123") {
    // Redirect to user dashboard
    window.location.href = "/dashboard";
    return;
  }

  // Show simple error
  alert("Invalid login credentials");
};
    // Add your login logic here
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Register data:', registerData);
    // Add your registration logic here
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Add forgot password logic here
  };

  const handleGoogleAuth = () => {
    console.log('Google auth clicked');
    // Add Google authentication logic here
  };

  const renderRoleSpecificFields = () => {
    switch (registerData.role) {
      case 'student':
        return (
          <div className="dynamic-fields">
            <h3>Student Information</h3>
            <div className="input-box">
              <input
                type="text"
                name="registrationNumber"
                value={registerData.registrationNumber}
                onChange={handleRegisterChange}
                placeholder="Registration Number"
                required
              />
              <i className="ri-id-card-fill"></i>
            </div>
          </div>
        );
      
      case 'staff':
        return (
          <div className="dynamic-fields">
            <h3>Staff Information</h3>
            <div className="input-box">
              <input
                type="text"
                name="staffNumber"
                value={registerData.staffNumber}
                onChange={handleRegisterChange}
                placeholder="Staff Number"
                required
              />
              <i className="ri-id-card-fill"></i>
            </div>
          </div>
        );
      
      case 'service_provider':
        return (
          <div className="dynamic-fields">
            <h3>Business Information</h3>
            <div className="input-box">
              <input
                type="text"
                name="businessName"
                value={registerData.businessName}
                onChange={handleRegisterChange}
                placeholder="Business Name"
              />
              <i className="ri-building-fill"></i>
            </div>
            <div className="input-box">
              <input
                type="text"
                name="serviceType"
                value={registerData.serviceType}
                onChange={handleRegisterChange}
                placeholder="Service Type"
              />
              <i className="ri-service-fill"></i>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`auth-container ${isActive ? 'active' : ''}`}>
      {/* Login Form */}
      <div className="form-box login">
        <form className="auth-form" onSubmit={handleLoginSubmit}>
          <div className="form-content">
            <h1>Login</h1>
            <div id="signInMessage" className="messageDiv" style={{ display: 'none' }}></div>
            
            <div className="input-box">
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Email"
                required
              />
              <i className="ri-user-fill"></i>
            </div>
            
            <div className="input-box">
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Password"
                required
              />
              <i className="ri-lock-password-fill"></i>
            </div>
            
            <div className="forgot-link">
              <a onClick={handleForgotPassword}>Forgot password?</a>
            </div>
            
            <button type="submit" className="auth-btn">Login</button>
            
            <p>or login with</p>
            <div className="social-icons">
              <a onClick={handleGoogleAuth}><i className="ri-google-fill"></i></a>
            </div>
          </div>
        </form>
      </div>

      {/* Registration Form */}
      <div className="form-box register">
        <form className="auth-form" onSubmit={handleRegisterSubmit}>
          <div className="form-content">
            <h1>Registration</h1>
            <div id="signUpMessage" className="messageDiv" style={{ display: 'none' }}></div>
            
            <div className="input-box">
              <input
                type="text"
                name="fullName"
                value={registerData.fullName}
                onChange={handleRegisterChange}
                placeholder="Fullname"
                required
              />
              <i className="ri-user-fill"></i>
            </div>
            
            <div className="input-box">
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                placeholder="Email"
                required
              />
              <i className="ri-mail-fill"></i>
            </div>

            {/* Role Selection */}
            <div className="role-selection">
              <label className="role-label">I am a:</label>
              <div className="role-options">
                {['student', 'staff', 'service_provider'].map(role => (
                  <div
                    key={role}
                    className={`role-option ${registerData.role === role ? 'selected' : ''}`}
                    onClick={() => handleRoleSelect(role)}
                  >
                    {role.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Role-Specific Fields */}
            {renderRoleSpecificFields()}

            {/* Common Department Field */}
            <div className="input-box">
              <input
                type="text"
                name="department"
                value={registerData.department}
                onChange={handleRegisterChange}
                placeholder="Department/Unit"
              />
              <i className="ri-building-2-fill"></i>
            </div>
            
            <div className="input-box">
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                placeholder="Password"
                required
              />
              <i className="ri-lock-password-fill"></i>
            </div>
            
            <button type="submit" className="auth-btn">Register</button>
            
            <p>or register with</p>
            <div className="social-icons">
              <a onClick={handleGoogleAuth}><i className="ri-google-fill"></i></a>
            </div>
          </div>
        </form>
      </div>

      {/* Toggle Box */}
      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Hello, Welcome <br/>to InfraWatch</h1>
          <p>Don't have an account?</p>
          <button className="auth-btn register-btn" onClick={toggleForms}>Register</button>
          <p style={{ marginTop: '10px' }}>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); handleNavigation('contact'); }}
              style={{ color: '#fff', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px' }}
            >
              Contact Us
            </a>
          </p>
        </div>
        
        <div className="toggle-panel toggle-right">
          <h1>Welcome to <br/>InfraWatch</h1>
          <p>Already have an account?</p>
          <button className="auth-btn login-btn" onClick={toggleForms}>Login</button>
          <p style={{ marginTop: '10px' }}>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); handleNavigation('contact'); }}
              style={{ color: '#fff', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px' }}
            >
              Contact Us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;