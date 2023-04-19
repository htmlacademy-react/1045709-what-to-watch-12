import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { format } from 'date-fns';
import { getReviewsDataLoadingStatus } from '../../../../store/reviews-data/selectors';
import { getReviews } from '../../../../store/reviews-data/selectors';
import { useAppSelector } from '../../../../hooks';
import { Reviews } from '../../../../types/review';
import { Film } from '../../../../types/film';
import LoadingScreen from '../../../../pages/loading-screen/loading-screen';

const REVIEW_DATE_FORMAT = 'MMMM d, yyyy';

const getPartOfReviews = (reviews: Reviews, fromIndex: number, toIndex: number) => (
  reviews.slice(fromIndex, toIndex).map((review) =>
    (
      <div key={review.id} className="review">
        <blockquote className="review__quote">
          <p className="review__text">{review.comment}</p>
          <footer className="review__details">
            <cite className="review__author">{review.user.name}</cite>
            <time className="review__date" dateTime={review.date}>{format(new Date(review.date), REVIEW_DATE_FORMAT)}</time>
          </footer>
        </blockquote>
        <div className="review__rating">{review.rating}</div>
      </div>
    )
  )
);

type ReviewTabProps = {
  film: Film;
}

function ReviewTab({film}: ReviewTabProps): JSX.Element {
  const isReviewsDataLoading = useAppSelector(getReviewsDataLoadingStatus);
  const reviews = useAppSelector(getReviews);
  const reviewsMiddleIndex = Math.ceil(reviews.length / 2);

  return (
    <React.Fragment>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className="film-nav__item">
            <Link to={`${AppRoute.Films}/${film.id}`} className="film-nav__link">Overview</Link>
          </li>
          <li className="film-nav__item">
            <Link to={`${AppRoute.Films}/${film.id}/${AppRoute.FilmDetailsTab}`} className="film-nav__link">Details</Link>
          </li>
          <li className="film-nav__item film-nav__item--active">
            <Link to='#' className="film-nav__link">Reviews</Link>
          </li>
        </ul>
      </nav>
      {isReviewsDataLoading ? <LoadingScreen /> :
        <div className="film-card__reviews film-card__row">
          <div className="film-card__reviews-col">
            {getPartOfReviews(reviews, 0, reviewsMiddleIndex)}
          </div>
          <div className="film-card__reviews-col">
            {getPartOfReviews(reviews, reviewsMiddleIndex, reviews.length)}
          </div>
        </div>}
    </React.Fragment>
  );
}

export default ReviewTab;
