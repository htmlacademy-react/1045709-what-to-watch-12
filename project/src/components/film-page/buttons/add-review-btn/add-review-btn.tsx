import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';

function AddReviewBtn({filmId}: {filmId: number}): JSX.Element {
  return (
    <Link to={`${AppRoute.Films}/${filmId}/${AppRoute.FilmAddReview}`} className="btn film-card__button">Add review</Link>
  );
}

export default AddReviewBtn;
