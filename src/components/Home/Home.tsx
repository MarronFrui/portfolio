import { useState } from 'react';
import Card from '../Card/Card';
import PersonalProjects from '../PersonalProjects/PersonalProjects';
import ProjectModal from '../ProjectModal/ProjectModal';
import { projects } from '../../data/projects';
import { useLanguage } from '../../translation/languageContext';
import type { Project } from '../../types/project';
import './Home.scss';

// Drop the PDF at public/cv.pdf; the button downloads it under this name.
const CV_URL = '/cv.pdf';
const CV_FILE_NAME = 'Maxime-Fels-CV.pdf';

const personal = projects.filter((p) => p.category === 'personal');
const study = projects.filter((p) => p.category === 'study');

function Home() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const { translate } = useLanguage();

  return (
    <div className="home">
      <section id="home" className="hero">
        <h1>Maxime Fels</h1>
        <p className="hero-tagline">{translate('HERO_TAGLINE')}</p>
        <div className="hero-actions">
          <a className="button" href={CV_URL} download={CV_FILE_NAME}>
            {translate('HERO_DOWNLOAD_CV')}
          </a>
          <a className="button button--ghost" href="#projects">
            {translate('HERO_SEE_PROJECTS')}
          </a>
        </div>
      </section>

      {/* Placeholder content: replace the ABOUT_ texts in src/translation/en.json and fr.json. */}
      <section id="about" className="home-section about">
        <h2>{translate('ABOUT_TITLE')}</h2>
        <p>{translate('ABOUT_PARAGRAPH_1')}</p>
        <p>{translate('ABOUT_PARAGRAPH_2')}</p>
      </section>

      {/* Preferred stack section goes here later. */}

      <section id="projects" className="home-section">
        <h2>{translate('SECTION_PERSONAL_PROJECTS')}</h2>
        <PersonalProjects projects={personal} />
      </section>

      <section id="study-projects" className="home-section">
        <h2>{translate('SECTION_STUDY_PROJECTS')}</h2>
        <div className="project-grid">
          {study.map((project) => (
            <Card key={project.id} project={project} onOpen={setOpenProject} />
          ))}
        </div>
      </section>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </div>
  );
}

export default Home;
