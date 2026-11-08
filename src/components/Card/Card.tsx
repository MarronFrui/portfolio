import './Card.scss';

function Card(id, title, cover) {
  return (
    <article className="card">
      <img className="card-image" alt="" />
      <h3 className="card-title">{title}</h3>
      <p className="card-summary">One line about the project.</p>
    </article>
  );
}

export default Card;
