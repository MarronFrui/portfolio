import { useState } from 'react';
import type { Project } from '../../types/project';
import { useLanguage } from '../../translation/languageContext';
import { useHoverVideo } from '../../hooks/useHoverVideo';
import { RoleList, StackList } from '../ProjectParts/ProjectParts';
import GameEmbed from '../GameEmbed/GameEmbed';
import './PersonalProjects.scss';

type PersonalProjectsProps = {
  projects: Project[];
};

// A row of thumbnails to pick a project, and a large showcase of the picked one.
function PersonalProjects({ projects }: PersonalProjectsProps) {
  const [selectedId, setSelectedId] = useState(projects[0]?.id);
  const [embedOpen, setEmbedOpen] = useState(false);
  const { ref: videoRef, play, stop } = useHoverVideo();
  const { translate } = useLanguage();

  const selected = projects.find((p) => p.id === selectedId) ?? projects[0];
  if (!selected) return null;
  const playableUrl = selected.playable ? selected.liveUrl : undefined;

  return (
    <div className="personal">
      <ul className="personal-tiles">
        {projects.map((project) => {
          const isSelected = project.id === selected.id;
          return (
            <li key={project.id}>
              <button
                type="button"
                className={`personal-tile${isSelected ? ' is-selected' : ''}`}
                aria-pressed={isSelected}
                aria-label={translate(project.title)}
                onClick={() => {
                  setSelectedId(project.id);
                  setEmbedOpen(false);
                }}
              >
                <img src={project.cover.src} alt="" loading="lazy" />
                <span className="personal-tile-hover">{project.stack[0]}</span>
                <span className="personal-tile-name">{translate(project.title)}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* The key restarts the entrance animation when another project is picked. */}
      <article key={selected.id} className="showcase">
        <header className="showcase-header">
          {selected.era === 'ai-first' && (
            <span className="era-label">{translate('PROJECT_ERA_AI_FIRST')}</span>
          )}
          {selected.era === 'pre-ai' && (
            <span className="era-label era-label--pre-ai">{translate('PROJECT_ERA_PRE_AI')}</span>
          )}
          <h3 className="showcase-title">{translate(selected.title)}</h3>
          <StackList stack={selected.stack} className="showcase-stack" />
        </header>

        {selected.repoUrl && (
          <a
            className="button button--contrast showcase-github"
            href={selected.repoUrl}
            target="_blank"
            rel="noreferrer"
          >
            {translate('PROJECT_VIEW_ON_GITHUB')} ↗
          </a>
        )}

        <figure
          className={`showcase-media${selected.video ? ' has-video' : ''}`}
          onMouseEnter={play}
          onMouseLeave={stop}
        >
          <img src={selected.cover.src} alt={translate(selected.cover.alt)} />
          {selected.video && (
            <video
              ref={videoRef}
              src={selected.video}
              preload="none"
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          )}
        </figure>
        <p className="showcase-status">
          {translate(selected.status === 'done' ? 'PROJECT_STATUS_DONE' : 'PROJECT_STATUS_IN_PROGRESS')}
        </p>

        <div className="showcase-text">
          <p className="showcase-summary">{translate(selected.summary)}</p>
          {playableUrl && (
            <div className="showcase-play">
              <button
                type="button"
                className="button button--contrast"
                onClick={() => setEmbedOpen(true)}
              >
                ▶ {translate('GAME_PLAY_SESSION')}
              </button>
            </div>
          )}
          <RoleList role={selected.role} />
        </div>
      </article>

      {playableUrl && (
        <GameEmbed
          open={embedOpen}
          title={translate(selected.title)}
          src={playableUrl}
          onClose={() => setEmbedOpen(false)}
        />
      )}
    </div>
  );
}

export default PersonalProjects;
