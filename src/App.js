import React, { useState } from 'react';
import AuthPage from './components/auth/AuthPage';
import ContactPage from './components/contact/ContactPage';
import HomePage from './components/home/HomePage';
import './styles/auth.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'auth', or 'contact'

  const renderPage = () => {
    switch (currentPage) {
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      case 'auth':
        return <AuthPage onNavigate={setCurrentPage} />;
      case 'home':
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;