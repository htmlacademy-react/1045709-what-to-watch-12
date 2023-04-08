import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { PromoFilm } from '../../types/film';
import LoadingScreen from '../../pages/loading-screen/loading-screent';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import UserFilmListPage from '../../pages/user-film-list-page/user-film-list-page';
import FilmPage from '../../pages/film-page/film-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import VideoPlayerPage from '../../pages/video-player-page/video-player-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

export type AppProps = {
  promoFilm: PromoFilm;
}

function App({promoFilm}: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isFilmsDataLoading = useAppSelector((state) => state.films.isLoading);
  const films = useAppSelector((state) => state.films.data);

  if (authorizationStatus === AuthorizationStatus.Unknown || isFilmsDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage promoFilm={promoFilm} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus} >
              <UserFilmListPage films={films} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={<FilmPage films={films} />}
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddReviewPage films={films} />}
        />
        <Route
          path={AppRoute.VideoPlayer}
          element={<VideoPlayerPage films={films} />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
