import { useState } from 'react';
import './Gallery.scss';

export default function Gallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // entries[0].isIntersecting — your "visible" input
        // where does it go? (there's exactly one state you decided on)
      },
      { threshold: 0.3 },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect(); // the part that makes or breaks this pattern
  }, []);

  // <div ref={cardRef}> ... the big card
  return (
    <>
      <div className="carousel-container">
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
    </>
  );
}
