import React, { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Header = ({ Session, setSession }) => {


  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the search query submission logic here, like calling an API or filtering data
    console.log('Search query:', query);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    if (window.confirm("Are you sure you want to Logout?")) {
      navigate("/");
    }
  };
  return (
    <div>

  <header id="header" className="header fixed-top d-flex align-items-center" Session={Session} setSession={setSession}>

    <div className="d-flex align-items-center justify-content-between">
      <Link to="/dashboard" className="logo d-flex align-items-center">
        <img src="assets/img/logo.png" alt=""/>
        <span className="d-none d-lg-block">Suadmin</span>
      </Link>
      <i className="bi bi-list toggle-sidebar-btn"></i>
    </div>

    <div className="search-bar">
      <form className="search-form d-flex align-items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          value={query}
          onChange={handleInputChange}
          placeholder="Search"
          title="Enter search keyword"
        />
        <button type="submit" title="Search">
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>

    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">

        <li className="nav-item d-block d-lg-none">
          <a className="nav-link nav-icon search-bar-toggle " href="#">
            <i className="bi bi-search"></i>
          </a>
        </li>


        <li className="nav-item dropdown pe-3">

          <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
            <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle"/>
            <span className="d-none d-md-block dropdown-toggle ps-2">admin</span>
          </a>

          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
           
         

            <li>
              <a className="dropdown-item d-flex align-items-center"    onClick={handleClick}>
                <i className="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </a>
            </li>
           
          </ul>
        </li>

      </ul>
    </nav>

  </header>
    </div>
  )
}

export default Header
