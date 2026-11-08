import { useState, useCallback } from 'react';
import './Gallery.scss';

export default function Gallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const cardRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return; // unmount / cleanup handled by observer lifecycle
    const observer = new IntersectionObserver(([entry]) => setIsPlaying(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(node);
    // React doesn't auto-disconnect here. return cleanup via a ref or store it.
    return () => observer.disconnect();
  }, []);

  // <div ref={cardRef}> ... the big card
  return (
    <div ref={cardRef} className={`carousel-container ${isPlaying ? 'is-playing' : ''}`}>
        {images.length > 1 && (
          <img
            className="carousel-arrow"
            src="/src/assets/arrow_carousel_left.png"
            onClick={() => {
              if (currentIndex - 1 === -1) {
                setCurrentIndex(images.length - 1);
              } else {
                setCurrentIndex(currentIndex - 1);
              }
            }}
          ></img>
        )}
        <img className="image" src={images[currentIndex]}></img>
        {images.length > 1 && (
          <img
            className="carousel-arrow"
            onClick={() => {
              if (currentIndex + 1 === images.length) {
                setCurrentIndex(0);
              } else {
                setCurrentIndex(currentIndex + 1);
              }
            }}
            src="/src/assets/arrow_carousel_right.png"
          ></img>
        )}
        {images.length > 1 && (
          <p className="carousel-length">
            {currentIndex + 1}/{images.length}
          </p>
        )}
      </div>
  );
}
