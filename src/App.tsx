import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import LanguageProvider from './translation/LanguageProvider';

// Single page: the header links scroll to the sections of Home.
function App() {
  return (
    <LanguageProvider>
      <div className="layout">
        <Header />
        <main>
          <Home />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
