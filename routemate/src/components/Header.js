import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
export const Header = () => {
  return (
    <header>
      <a href="/" className="logo">
        <img src={Logo} alt="Routemate Logo" />
        <span>Routemate</span>
      </a>
      <nav className="navigation">
        <NavLink to="/" className="link" end>
          Home
        </NavLink>
        <NavLink to="/products" className="link">
          Products
        </NavLink>
        <NavLink to="/contact" className="link">
          Contacts
        </NavLink>
      </nav>
    </header>
  );
};
