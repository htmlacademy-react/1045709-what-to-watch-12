import React from 'react';
import { useAppSelector } from '../../hooks';
import { getPromoFilm, getPromoFilmDataLoadingStatus } from '../../store/films-data/selectors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import PlayBtn from '../film-page/buttons/play-btn/play-btn';
import MyListBtn from '../film-page/buttons/my-list-btn/my-list-btn';
import Header from '../header/header';

function PromoFilm(): JSX.Element {
  const promoFilm = useAppSelector(getPromoFilm);
  const isPromoFilmDataLoading = useAppSelector(getPromoFilmDataLoadingStatus);

  if (isPromoFilmDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <React.Fragment>

      <Header film={promoFilm} />

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
              <PlayBtn filmId={promoFilm.id} />
              <MyListBtn filmId={promoFilm.id} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PromoFilm;
