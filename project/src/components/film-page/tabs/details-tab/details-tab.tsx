import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { Film } from '../../../../types/film';

type DetailsTabProps = {
  film: Film;
}

function DetailsTab({film}: DetailsTabProps): JSX.Element {
  return (
    <React.Fragment>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className="film-nav__item">
            <Link to={`${AppRoute.Films}/${film.id}`} className="film-nav__link">Overview</Link>
          </li>
          <li className="film-nav__item film-nav__item--active">
            <Link to='#' className="film-nav__link">Details</Link>
          </li>
          <li className="film-nav__item">
            <Link to={`${AppRoute.Films}/${film.id}/${AppRoute.FilmReviewsTab}`} className="film-nav__link">Reviews</Link>
          </li>
        </ul>
      </nav>
      <div className="film-card__text film-card__row">
        <div className="film-card__text-col">
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Director</strong>
            <span className="film-card__details-value">{film.director}</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Starring</strong>
            <span className="film-card__details-value">
              {film.starring.join(', ')}
            </span>
          </p>
        </div>

        <div className="film-card__text-col">
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Run Time</strong>
            <span className="film-card__details-value">{film.runTime}</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Genre</strong>
            <span className="film-card__details-value">{film.genre}</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Released</strong>
            <span className="film-card__details-value">{film.released}</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DetailsTab;
