import Gallery from '../Gallery/Gallery';
import SkillBar from '../SkillBar/SkillBar';
import { projects } from '../../data/projects';
import { skills } from '../../data/skills';
import './Home.scss';

function Home() {
  return (
    <div className="home">
      <section className="home-title">
        <h1>Maxime Fels</h1>
        <p>Front-end developer | building things for the web.</p>
      </section>
      <section className="home-section">
        <h2>Skills</h2>
        <div className="home-skills">
          {skills.map((skill) => (
            <SkillBar key={skill.name} skill={skill} />
          ))}
        </div>
      </section>
      <section className="home-section">
        <h2>Professional projects</h2>
        <Gallery projects={projects.filter((p) => p.category === 'professional')} />
      </section>
      <section className="home-section">
        <h2>Personal projects</h2>
        <Gallery projects={projects.filter((p) => p.category === 'personal')} />
      </section>
    </div>
  );
}

export default Home;
