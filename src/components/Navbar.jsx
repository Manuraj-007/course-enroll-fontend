import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="header-glass">
      <div className="container nav-container">
        <div className="logo-section">
          <GraduationCap size={32} strokeWidth={2.5} />
          <span>EduEnroll</span>
        </div>
        
        <div className="nav-links">
          <button 
            className={`nav-link-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            Course Catalog
          </button>
          <button 
            className={`nav-link-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            Admin Dashboard
          </button>
        </div>
      </div>
    </header>
  );
}
