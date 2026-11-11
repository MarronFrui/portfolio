import { useState, useCallback } from 'react';
import Card from '../Card/Card';
import type { Project } from '../../types/project';
import arrowLeft from '../../assets/arrow_carousel_left.png';
import arrowRight from '../../assets/arrow_carousel_right.png';
import './Gallery.scss';

const CARD_WIDTH = 760; // must match $card-width in Gallery.scss

type GalleryProps = {
  projects: Project[];
};

function Gallery({ projects }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play the front video only while the gallery is on screen.
  const cardRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setIsPlaying(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (projects.length === 0) return null;

  // Single project: nothing to rotate, render the card plainly.
  if (projects.length === 1) {
    return (
      <div ref={cardRef} className="carousel">
        <Card project={projects[0]} isPlaying={isPlaying} />
      </div>
    );
  }

  const count = projects.length;
  const prev = () => setCurrentIndex((i) => (i - 1 + count) % count);
  const next = () => setCurrentIndex((i) => (i + 1) % count);

  const step = 360 / count;
  // Ring radius that places the cards edge-to-edge on their orbit.
  // For 2 projects the geometry degenerates (they face opposite ways), pick a fixed radius.
  const radius = count > 2 ? Math.round(CARD_WIDTH / (2 * Math.tan(Math.PI / count))) : 520;

  // Each card orbits the central axis but keeps facing the screen:
  // rotateY(θ) translateZ(r) places it on the orbit, the closing rotateY(-θ)
  // cancels the facing rotation: a Ferris wheel.
  const slideTransform = (i: number) => {
    const theta = (i - currentIndex) * step;
    return `rotateY(${theta}deg) translateZ(${radius}px) rotateY(${-theta}deg)`;
  };

  return (
    <div>
      <div ref={cardRef} className="carousel">
        <button type="button" className="carousel-arrow" onClick={prev} aria-label="Previous project">
          <img src={arrowLeft} alt="" />
        </button>

        {/* The ring is pushed back so the front card sits at z=0. */}
        <div className="carousel-ring" style={{ transform: `translateZ(-${radius}px)` }}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`carousel-slide ${i === currentIndex ? 'is-front' : ''}`}
              style={{ transform: slideTransform(i) }}
              // Hidden cards can't be clicked, tabbed to or read by screen readers.
              inert={i !== currentIndex}
            >
              <Card project={project} isPlaying={isPlaying && i === currentIndex} />
            </div>
          ))}
        </div>

        <button type="button" className="carousel-arrow" onClick={next} aria-label="Next project">
          <img src={arrowRight} alt="" />
        </button>
      </div>
      <p className="carousel-counter">
        {currentIndex + 1}/{count}
      </p>
    </div>
  );
}

export default Gallery;
