import './Card.scss';

function Card() {
  return (
    {
      const cardRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      // entries[0].isIntersecting — your "visible" input
      // where does it go? (there's exactly one state you decided on)
    },
    { threshold: 0.3 }
  );
  if (cardRef.current) observer.observe(cardRef.current);
  return () => observer.disconnect(); // the part that makes or breaks this pattern
}, []);

// <div ref={cardRef}> ... the big card
    }
    <article className="card">
      <img className="card-image" alt="" />
      <h3 className="card-title">Project title</h3>
      <p className="card-summary">One line about the project.</p>
    </article>
  );
}

export default Card;
