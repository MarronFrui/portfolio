import Card from '../Card/Card';
import './Home.scss';

function Home() {
  return (
    <div className="home">
      <section className="home-hero">
        <h1>Maxime Fels</h1>
        <p>Front-end developer | building things for the web.</p>
      </section>
      <section className="home-section">
        <h2>Projects</h2>
        <div className="home-gallery">
          <Card />
        </div>
      </section>
    </div>
  );
}

export default Home;
