import { Link, useParams } from 'react-router-dom';
import './Item.scss';
import dataJson from '../../data.json';
import type { Project } from '../../types/projectSchema';

const data = dataJson as Project[];

function Item() {
  const { id } = useParams();
  const project = data.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="item">
        <p className="item-missing">
          Project not found. <Link to="/">Back to home</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="item">
      <div className="item-card">
        <div className="item-media">
          {project.video ? (
            <video className="item-video" src={project.video} muted loop autoPlay playsInline />
          ) : (
            <img className="item-image" src={project.cover.src} alt={project.cover.alt.en} />
          )}
        </div>

        <header className="item-header">
          <h1 className="item-title">{project.title.en}</h1>
          <div className="item-badges">
            <span className={`item-badge item-badge--${project.category}`}>{project.category}</span>
            <span className={`item-status item-status--${project.status}`}>
              {project.status === 'done' ? 'shipped' : 'in progress'}
            </span>
          </div>
        </header>

        <p className="item-summary">{project.summary.en}</p>
        <p className="item-description">{project.description.en}</p>

        <h2 className="item-subtitle">Stack</h2>
        <ul className="item-stack">
          {project.stack.map((tech) => (
            <li key={tech} className="item-tech">
              {tech}
            </li>
          ))}
        </ul>

        <div className="item-actions">
          {project.repoUrl && (
            <a className="item-button" href={project.repoUrl} target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          )}
          {project.liveUrl && (
            <a className="item-button" href={project.liveUrl} target="_blank" rel="noreferrer">
              Live demo
            </a>
          )}
          <Link className="item-button item-button--ghost" to="/">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Item;
