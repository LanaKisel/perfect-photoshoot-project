import { NavLink } from "react-router-dom";
import "./Navigation.css";
import React from "react";

function Navigation() {
  return (
    <nav>
      <NavLink
        to="/"
        className="nav-link"
      >
        Home
      </NavLink>
      <NavLink
        to="/photographers"
        className="nav-link"
      >
        Photographers
      </NavLink>
      <NavLink
        to="/mybookings"
        className="nav-link"
      >
        My bookings
      </NavLink>
    </nav>
  );
};

export default Navigation