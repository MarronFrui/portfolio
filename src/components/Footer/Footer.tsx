import './Footer.scss';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="/" className="nav-link">
          GitHub
        </Link>
        <div>Email</div>
      </div>
    </footer>
  );
}

export default Footer;
