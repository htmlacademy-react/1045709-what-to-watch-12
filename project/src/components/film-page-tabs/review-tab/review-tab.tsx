import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../../types/film';

type ReviewTabProps = {
  film: Film;
}

function ReviewTab({film}: ReviewTabProps): JSX.Element {
  return (
    <React.Fragment>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className="film-nav__item">
            <Link to={`/films/${film.id}/overview`} className="film-nav__link">Overview</Link>
          </li>
          <li className="film-nav__item">
            <Link to={`/films/${film.id}/details`} className="film-nav__link">Details</Link>
          </li>
          <li className="film-nav__item film-nav__item--active">
            <Link to={`/films/${film.id}/reviews`} className="film-nav__link">Reviews</Link>
          </li>
        </ul>
      </nav>
      <div className="film-card__reviews film-card__row">
        <div className="film-card__reviews-col">
          {film.reviews.slice(0, Math.ceil(film.reviews.length / 2)).map((review) =>
            (
              // eslint-disable-next-line react/jsx-key
              <div className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{review.comment}</p>
                  <footer className="review__details">
                    <cite className="review__author">{review.author}</cite>
                    <time className="review__date" dateTime={review.date}>{review.date}</time>
                  </footer>
                </blockquote>
                <div className="review__rating">{review.rating}</div>
              </div>
            )
          )}
        </div>
        <div className="film-card__reviews-col">
          {film.reviews.slice(Math.ceil(film.reviews.length / 2)).map((review) =>
            (
              <div key={review.author} className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{review.comment}</p>
                  <footer className="review__details">
                    <cite className="review__author">{review.author}</cite>
                    <time className="review__date" dateTime={review.date}>{review.date}</time>
                  </footer>
                </blockquote>
                <div className="review__rating">{review.rating}</div>
              </div>
            )
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ReviewTab;
