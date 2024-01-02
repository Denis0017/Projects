import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#1f1f1f'}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{color: 'white'}}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
            alt="Logo"
            width="40"
            height="30"
            className="d-inline-block align-text-top"
          />
          Data Visualization
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/" style={{color: 'white'}}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Documentation" style={{color: 'white'}}>
                Source & Documentation
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{color: 'white'}}>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
