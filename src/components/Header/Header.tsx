import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <nav className="nav">
          <Link to="/" className="nav-link">
            ACCUEIL
          </Link>
          <Link to="/about" className="nav-link nav-about">
            A PROPOS
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
