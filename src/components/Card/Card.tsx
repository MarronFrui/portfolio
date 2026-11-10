import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types/projectSchema';
import './Card.scss';

type CardProps = {
  project: Project;
  isPlaying?: boolean;
};

function Card({ project, isPlaying = false }: CardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.play().catch(() => {
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  return (
    <Link to={`/item/${project.id}`} className="card-link" aria-label={`See the project ${project.title.en}`}>
      <article className={`card ${isPlaying ? 'is-playing' : ''}`}>
        <div className="card-media">
          <img className="card-image" src={project.cover.src} alt={project.cover.alt.en} />
          {project.video && (
            <video
              ref={videoRef}
              className="card-video"
              src={project.video}
              muted
              loop
              playsInline
            />
          )}
        </div>
        <h3 className="card-title">{project.title.en}</h3>
        <p className="card-summary">{project.summary.en}</p>
      </article>
    </Link>
  );
}

export default Card;