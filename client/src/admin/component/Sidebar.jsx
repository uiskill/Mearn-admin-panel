import React from 'react'
import { Link, useNavigate } from "react-router-dom";
const Sidebar = () => {
  return (
    <div>
 
  <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">

      <li className="nav-item">
        <Link className="nav-link " to="/dashboard">
          <i className="bi bi-grid"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <li className="nav-item">
        <a className="nav-link" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
          <i className="bi bi-menu-button-wide"></i><span>Su_Placement</span><i className="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to="/placement-list">
              <i className="bi bi-circle"></i><span>Placements</span>
            </Link>
          </li>
          
         
        </ul>
      </li>

      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#" aria-expanded="false">
          <i class="bi bi bi-person"></i><span>Faculty</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="forms-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav" >
          <li>
            <Link to="/facultylist">
              <i class="bi bi-circle"></i><span>Faculty</span>
            </Link>
          </li>
       
        </ul>
      </li>
    
     
      

      

    </ul>

  </aside>
    </div>
  )
}

export default Sidebar
