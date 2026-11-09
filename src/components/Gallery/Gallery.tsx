import { useState, useCallback } from 'react';
import type { CSSProperties } from 'react';
import Card from '../Card/Card';
import type { Project } from '../../types/projectSchema';
import './Gallery.scss';

const CARD_WIDTH = 760; // must match --card-width in Gallery.scss

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

  // Single project: nothing to rotate, render the card plainly.
  if (projects.length === 1) {
    return (
      <div className="carousel-container">
        <div ref={cardRef} className="carousel">
          <Card project={projects[0]} isPlaying={isPlaying} />
        </div>
      </div>
    );
  }

  const count = projects.length;
  const step = 360 / count;
  // Ring radius that places the cards edge-to-edge on their orbit.
  // For 2 projects the geometry degenerates (they face opposite ways), pick a fixed radius.
  const radius = count > 2 ? Math.round(CARD_WIDTH / (2 * Math.tan(Math.PI / count))) : 520;

  // The ring itself is static (just pushed back so the front card sits at z=0).
  const ringStyle = {
    '--card-width': `${CARD_WIDTH}px`,
    transform: `translateZ(-${radius}px)`,
  } as CSSProperties;

  // Each card orbits the central axis but keeps facing the screen:
  // rotateY(θ) translateZ(r) places it on the orbit, the closing rotateY(-θ)
  // cancels the facing rotation : a Ferris wheel
  const slideTransform = (i: number) => {
    const theta = (i - currentIndex) * step;
    return `rotateY(${theta}deg) translateZ(${radius}px) rotateY(${-theta}deg)`;
  };

  return (
    <div className="carousel-container">
      <div ref={cardRef} className={`carousel ${isPlaying ? 'is-playing' : ''}`}>
        <img
          className="carousel-arrow"
          src="/src/assets/arrow_carousel_left.png"
          alt="previous project"
          onClick={prev}
        />

        <div className="carousel-ring" style={ringStyle}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`carousel-slide ${i === currentIndex ? 'is-front' : ''}`}
              style={{ transform: slideTransform(i) } as CSSProperties}
            >
              <Card project={project} isPlaying={isPlaying && i === currentIndex} />
            </div>
          ))}
        </div>

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
  );
}
