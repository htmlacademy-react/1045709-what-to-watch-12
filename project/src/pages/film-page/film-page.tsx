import React from 'react';
import { useEffect } from 'react';
import { fetchSimilarFilmsAction, fetchReviewsAction } from '../../store/api-actions';
import { getFilmDataLoadingStatus } from '../../store/films-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useGetFilmInPage from '../../hooks/useGetFilmInPage';
import { AuthorizationStatus } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';
import LoadingScreen from '../loading-screen/loading-screen';
import Header from '../../components/header/header';
import PlayBtn from '../../components/film-page/buttons/play-btn/play-btn';
import AddReviewBtn from '../../components/film-page/buttons/add-review-btn/add-review-btn';
import MyListBtn from '../../components/film-page/buttons/my-list-btn/my-list-btn';
import Tabs from '../../components/film-page/tabs/tabs';
import SimilarFilmList from '../../components/film-lists/similar-film-list.tsx/similar-film-list';
import Footer from '../../components/footer/footer';

function FilmPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const filmInPage = useGetFilmInPage();
  const isFilmDataLoading = useAppSelector(getFilmDataLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (filmInPage) {
      dispatch(fetchSimilarFilmsAction(filmInPage.id));
      dispatch(fetchReviewsAction(filmInPage.id));
    }
  }, [dispatch, filmInPage]);

  if (isFilmDataLoading) {
    return <LoadingScreen />;
  }

  if (!filmInPage) {
    return <NotFoundPage />;
  }

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">

          <Header film={filmInPage} />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{filmInPage.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{filmInPage.genre}</span>
                <span className="film-card__year">{filmInPage.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayBtn filmId={filmInPage.id} />
                <MyListBtn filmId={filmInPage.id} />
                {
                  authorizationStatus === AuthorizationStatus.Auth
                  &&
                  <AddReviewBtn filmId={filmInPage.id} />
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
              <Tabs film={filmInPage} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <SimilarFilmList />
        </section>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default FilmPage;
