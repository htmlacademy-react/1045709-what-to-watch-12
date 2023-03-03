import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainPage from '../../pages/main-page/main-page';
import Login from '../../pages/login/login';
import UserFilmList from '../../pages/user-film-list/user-film-list';
import Film from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import VideoPlayer from '../../pages/video-player/video-player';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { FilmCardProps } from '../../types/film-card-props';

function App(props: FilmCardProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage title={props.title} genre={props.genre} year={props.year} />}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth} >
              <UserFilmList />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={<Film />}
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddReview />}
        />
        <Route
          path={AppRoute.VideoPlayer}
          element={<VideoPlayer />}
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
