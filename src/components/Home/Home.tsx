import Gallery from '../Gallery/Gallery';
import './Home.scss';
import dataJson from '../../data.json';
import type { Project } from '../../types/projectSchema';

const data = dataJson as Project[];

function Home() {
  return (
    <div className="home">
      <section className="home-title">
        <h1>Maxime Fels</h1>
        <p>Front-end developer | building things for the web.</p>
      </section>
      <section className="home-section">
        <h2>Skills</h2>
        <ul>
          <li>Html + css</li>
          <li>JavaScript</li>
          <li>TypeScript</li>
          <li>React</li>
        </ul>
      </section>
      <section className="home-section">
        <h2>Professional projects</h2>
        <div className="home-gallery">
          <Gallery projects={data.filter((p) => p.category === 'professional')} />
        </div>
      </section>
      <section className="home-section">
        <h2>Personal projects</h2>
        <div className="home-gallery">
          <Gallery projects={data.filter((p) => p.category === 'personal')} />
        </div>
      </section>
    </div>
  );
}

export default Home;
