import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../../types/film';

type OverviewTabProps = {
  film: Film;
}

function OverviewTab({film}: OverviewTabProps): JSX.Element {
  return (
    <React.Fragment>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className="film-nav__item film-nav__item--active">
            <Link to={`/films/${film.id}/overview`} className="film-nav__link">Overview</Link>
          </li>
          <li className="film-nav__item">
            <Link to={`/films/${film.id}/details`} className="film-nav__link">Details</Link>
          </li>
          <li className="film-nav__item">
            <Link to={`/films/${film.id}/reviews`} className="film-nav__link">Reviews</Link>
          </li>
        </ul>
      </nav>
      <div className="film-rating">
        <div className="film-rating__score">{film.filmInfo.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{film.filmInfo.ratingVotesQuantity} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.filmInfo.description}</p>

        <p className="film-card__director"><strong>Director: {film.filmInfo.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {film.filmInfo.actors.join(', ')} and other</strong></p>
      </div>
    </React.Fragment>
  );
}

export default OverviewTab;
