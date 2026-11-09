import { useState, useCallback } from 'react';
import Card from '../Card/Card';
import type { Project } from '../../types/projectSchema';
import './Gallery.scss';

export default function Gallery({ projects }: { projects: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const cardRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setIsPlaying(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!projects || projects.length === 0) return null;

  const prev = () => setCurrentIndex((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setCurrentIndex((i) => (i + 1) % projects.length);

  return (
    <>
      <div className="carousel-container">
        <div ref={cardRef} className={`carousel ${isPlaying ? 'is-playing' : ''}`}>
          <img
            className="carousel-arrow"
            src="/src/assets/arrow_carousel_left.png"
            alt="previous project"
            onClick={prev}
          />

          {projects.map((project) => (
            <Card key={project.id} project={project} />
          ))}

          <img
            className="carousel-arrow"
            src="/src/assets/arrow_carousel_right.png"
            alt="next project"
            onClick={next}
          />
        </div>
        <p className="carousel-length">
          {currentIndex + 1}/{projects.length}
        </p>
      </div>
    </>
  );
}
