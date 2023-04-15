import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { getPromoFilm } from '../../store/films-data/selectors';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import GenreFiltersList from '../../components/genre-filters-list/genre-filters-list';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';

function MainPage(): JSX.Element {
  const promoFilm = useAppSelector(getPromoFilm);

  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          < Logo />
          < UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={promoFilm.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  onClick={() => dispatch(redirectToRoute(`/player/${promoFilm.id}`))}
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          < GenreFiltersList />
          < FilmList />

        </section>

        < Footer />

      </div>
    </React.Fragment>
  );
}

export default MainPage;
