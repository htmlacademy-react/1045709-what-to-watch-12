import { Link } from 'react-router-dom';

function AddReviewBtn({filmId}: {filmId: number}): JSX.Element {
  return (
    <Link to={`/films/${filmId}/review`} className="btn film-card__button">Add review</Link>
  );
}

export default AddReviewBtn;
