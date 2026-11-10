import './Footer.scss';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="https://github.com/MarronFrui" className="nav-link">
          GitHub
        </Link>
        <div>Email : maxime.fels@gmail.com</div>
      </div>
    </footer>
  );
}

export default Footer;
