import type { Project } from '../../types/project';
import { useLanguage } from '../../i18n/languageContext';
import { useHoverVideo } from '../../hooks/useHoverVideo';
import './Card.scss';

type CardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

function Card({ project, onOpen }: CardProps) {
  const { ref: videoRef, play, stop } = useHoverVideo();
  const { translate } = useLanguage();

  return (
    <article
      className={`card${project.video ? ' has-video' : ''}`}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
    >
      <div className="card-media">
        <img
          className="card-image"
          src={project.cover.src}
          alt={translate(project.cover.alt)}
          loading="lazy"
        />
        {project.video && (
          <video
            ref={videoRef}
            className="card-video"
            src={project.video}
            preload="none"
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        )}
        {project.status === 'in-progress' && (
          <span className="card-status">{translate('PROJECT_STATUS_IN_PROGRESS')}</span>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-title">
          {/* Its ::after stretches over the whole card, so the card is clickable. */}
          <button type="button" className="card-open" onClick={() => onOpen(project)}>
            {translate(project.title)}
          </button>
        </h3>
        <p className="card-summary">{translate(project.summary)}</p>

        <h4 className="card-subtitle">{translate('PROJECT_MY_ROLE')}</h4>
        <ul className="card-role">
          {project.role.map((key) => (
            <li key={key}>{translate(key)}</li>
          ))}
        </ul>

        <ul className="card-stack" aria-label={translate('PROJECT_STACK')}>
          {project.stack.map((tech) => (
            <li key={tech} className="card-tech">
              {tech}
            </li>
          ))}
        </ul>

        <div className="card-actions">
          {project.repoUrl && (
            <a className="button" href={project.repoUrl} target="_blank" rel="noreferrer">
              {translate('PROJECT_VIEW_ON_GITHUB')}
            </a>
          )}
          {project.liveUrl && (
            <a
              className="button button--ghost"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              {translate('PROJECT_LIVE_DEMO')}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default Card;
