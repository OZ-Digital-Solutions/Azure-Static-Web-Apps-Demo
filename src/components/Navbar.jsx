import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar-inner">
        <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          About
        </NavLink>
      </nav>
    </header>
  );
}