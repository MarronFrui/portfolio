import { useState } from 'react';
import Card from '../Card/Card';
import PersonalProjects from '../PersonalProjects/PersonalProjects';
import ProjectModal from '../ProjectModal/ProjectModal';
import GitHubCalendar from '../GitHubCalendar/GitHubCalendar';
import { projects } from '../../data/projects';
import { useLanguage } from '../../translation/languageContext';
import type { Project } from '../../types/project';
import './Home.scss';

// Drop the PDF at public/cv.pdf; the button downloads it under this name.
// BASE_URL is '/portfolio/' on GitHub Pages, so the href must carry the base.
const CV_URL = `${import.meta.env.BASE_URL}cv.pdf`;
const CV_FILE_NAME = 'Maxime-Fels-CV.pdf';

const personal = projects.filter((p) => p.category === 'personal');
const study = projects.filter((p) => p.category === 'study');

function Home() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const { translate } = useLanguage();

  return (
    <div className="home">
      <section id="home" className="hero">
        {/* The role lives inside the h1 so SEO keywords sit in the top heading. */}
        <h1>
          Maxime Fels
          <span className="hero-role"> | {translate('HERO_ROLE')}</span>
        </h1>
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

      <section id="about" className="home-section about">
        <h2>{translate('ABOUT_TITLE')}</h2>
        <p>{translate('ABOUT_PARAGRAPH_1')}</p>
        <p>{translate('ABOUT_PARAGRAPH_2')}</p>
        <p>{translate('ABOUT_PARAGRAPH_3')}</p>
        <GitHubCalendar />
      </section>

      <section id="skills" className="home-section skills">
        <h2>{translate('SECTION_SKILLS')}</h2>
        <dl className="skills-list">
          <div className="skills-group">
            <dt>{translate('SKILLS_FRONTEND_LABEL')}</dt>
            <dd>{translate('SKILLS_FRONTEND')}</dd>
          </div>
          <div className="skills-group">
            <dt>{translate('SKILLS_BACKEND_LABEL')}</dt>
            <dd>{translate('SKILLS_BACKEND')}</dd>
          </div>
          <div className="skills-group">
            <dt>{translate('SKILLS_INFRA_LABEL')}</dt>
            <dd>{translate('SKILLS_INFRA')}</dd>
          </div>
        </dl>
      </section>

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
