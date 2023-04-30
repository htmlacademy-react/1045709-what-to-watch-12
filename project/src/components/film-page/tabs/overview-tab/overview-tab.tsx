import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, RatingValues } from '../../../../const';
import { Film } from '../../../../types/film';

export function getTextFilmRating(rating: number) {
  if (rating < RatingValues.Normal.startValue) {
    return RatingValues.Bad.text;
  }
  if (rating < RatingValues.Good.startValue) {
    return RatingValues.Normal.text;
  }
  if (rating < RatingValues.VeryGood.startValue) {
    return RatingValues.Good.text;
  }
  if (rating < RatingValues.Awesome.startValue) {
    return RatingValues.VeryGood.text;
  }
  if (rating === RatingValues.Awesome.startValue) {
    return RatingValues.Awesome.text;
  }

  return 'No rating';
}

type OverviewTabProps = {
  film: Film;
}

function OverviewTab({film}: OverviewTabProps): JSX.Element {
  return (
    <React.Fragment>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className="film-nav__item film-nav__item--active">
            <Link to='#' className="film-nav__link">Overview</Link>
          </li>
          <li className="film-nav__item">
            <Link to={AppRoute.FilmDetailsTab} className="film-nav__link">Details</Link>
          </li>
          <li className="film-nav__item">
            <Link to={AppRoute.FilmReviewsTab} className="film-nav__link">Reviews</Link>
          </li>
        </ul>
      </nav>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getTextFilmRating(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {film.starring.join(', ')} and other</strong></p>
      </div>
    </React.Fragment>
  );
}

export default OverviewTab;
