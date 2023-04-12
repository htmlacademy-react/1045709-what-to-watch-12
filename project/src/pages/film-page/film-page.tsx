import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import { fetchSimilarFilmAction, fetchReviewsAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getSimilarFilmsDataLoadingStatus } from '../../store/films-data/selectors';
import { useAppSelector } from '../../hooks';
import useGetFilmInPage from '../../hooks/useGetFilmInPage';
import { Films } from '../../types/film';
import { AuthorizationStatus } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import FilmPageTabs from '../../components/film-page-tabs/film-page-tabs';
import MoreLikeFilms from '../../components/more-like-films/more-like-films';
import LoadingScreen from '../loading-screen/loading-screent';
import Footer from '../../components/footer/footer';

type AddReviewPageProps = {
  films: Films;
}

function FilmPage({films}: AddReviewPageProps): JSX.Element {
  const filmInPage = useGetFilmInPage(films);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isSimilarFilmsLoading = useAppSelector(getSimilarFilmsDataLoadingStatus);

  useEffect(() => {
    if (filmInPage) {
      store.dispatch(fetchSimilarFilmAction(filmInPage.id));
      store.dispatch(fetchReviewsAction(filmInPage.id));
    }
  }, [filmInPage]);


  if (!filmInPage) {
    return <NotFoundPage />;
  }

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            < Logo />
            < UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{filmInPage.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{filmInPage.genre}</span>
                <span className="film-card__year">{filmInPage.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
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
                  <span className="film-card__count">{films.length}</span>
                </button>
                {
                  authorizationStatus === AuthorizationStatus.Auth
                  &&
                  <Link to={`/films/${filmInPage.id}/review`} className="btn film-card__button">Add review</Link>
                }

              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={filmInPage.posterImage} alt={filmInPage.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <FilmPageTabs film={filmInPage} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        {
          isSimilarFilmsLoading
            ?
            <LoadingScreen />
            :
            <MoreLikeFilms />
        }
        < Footer />
      </div>
    </React.Fragment>
  );
}

export default FilmPage;
