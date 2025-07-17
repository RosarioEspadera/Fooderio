import { NavLink } from 'react-router-dom';

export default function NavBar({ user, onSignOut }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-item">Catalog</NavLink>
      {user && <NavLink to="/publish" className="nav-item">Publish</NavLink>}
      {user && <NavLink to="/profile" className="nav-item">My Dishes</NavLink>}
      <div className="nav-spacer" />
      {user 
        ? <button onClick={onSignOut}>Sign Out</button>
        : <NavLink to="/login" className="nav-item">Sign In</NavLink>}
    </nav>
  );
}
