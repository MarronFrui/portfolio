import type { Project } from '../../types/project';
import { useLanguage } from '../../translation/languageContext';
import { useHoverVideo } from '../../hooks/useHoverVideo';
import { ProjectLinks, RoleList, StackList } from '../ProjectParts/ProjectParts';
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

        <RoleList role={project.role} />
        <StackList stack={project.stack} />
        <ProjectLinks project={project} className="card-actions" />
      </div>
    </article>
  );
}

export default Card;
