import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoriteFilmsPage from '../../pages/favorite-films-page/favorite-films-page';
import FilmPage from '../../pages/film-page/film-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import VideoPlayerPage from '../../pages/video-player-page/video-player-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getAuthorizationStatus, getAuthCheckedStatus } from '../../store/user-process/selectors';
import { getFilmsDataLoadingStatus } from '../../store/films-data/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isFilmsDataLoading = useAppSelector(getFilmsDataLoadingStatus);

  if (!isAuthChecked || isFilmsDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus} >
              <FavoriteFilmsPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film} >
          <Route index element={<FilmPage />}/>
          <Route path={AppRoute.FilmTab} element={<FilmPage />} />
          <Route path={AppRoute.FilmAddReview} element={
            <PrivateRoute authorizationStatus={authorizationStatus} >
              <AddReviewPage />
            </PrivateRoute>
          }
          />
        </Route>
        <Route
          path={`${AppRoute.VideoPlayer}/:id`}
          element={<VideoPlayerPage />}
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
