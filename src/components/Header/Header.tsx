import { useLanguage } from '../../i18n/languageContext';
import type { TranslationKey } from '../../i18n/translate';
import './Header.scss';

// Each link scrolls to a section id on the page (smooth scroll is set in global.scss).
const links: { href: string; label: TranslationKey }[] = [
  { href: '#home', label: 'NAV_HOME' },
  { href: '#about', label: 'NAV_ABOUT' },
  { href: '#projects', label: 'NAV_PROJECTS' },
  { href: '#openclassrooms', label: 'NAV_OPENCLASSROOMS' },
  { href: '#contact', label: 'NAV_CONTACT' },
];

function Header() {
  const { language, setLanguage, translate } = useLanguage();

  return (
    <header className="header">
      <div className="header-content">
        <nav className="nav">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {translate(link.label)}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="language-switch"
          onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
          aria-label={translate('LANGUAGE_SWITCH_LABEL')}
        >
          <span className={language === 'fr' ? 'is-active' : ''}>FR</span>
          <span aria-hidden="true">/</span>
          <span className={language === 'en' ? 'is-active' : ''}>EN</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
