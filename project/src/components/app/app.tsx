import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import UserFilmListPage from '../../pages/user-film-list-page/user-film-list-page';
import FilmPage from '../../pages/film-page/film-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import VideoPlayerPage from '../../pages/video-player-page/video-player-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { MainPageProps } from '../../types/main-page-props';


function App({headerFilm, films}: MainPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage headerFilm={headerFilm} films={films} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth} >
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
    </BrowserRouter>
  );
}

export default App;
