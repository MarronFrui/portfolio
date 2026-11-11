import './Footer.scss';

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <a
          href="https://github.com/MarronFrui"
          className="footer-link"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a href="mailto:maxime.fels@gmail.com" className="footer-link">
          maxime.fels@gmail.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
