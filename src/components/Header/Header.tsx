import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <nav className="nav">
          <Link to="/" className="nav-link">
            HOME
          </Link>
          <Link to="/about" className="nav-link">
            ABOUT
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
