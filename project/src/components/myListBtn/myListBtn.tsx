import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteFilmAction, postFavoriteStatusAction } from '../../store/api-actions';
import { getFavoriteFilms, getFavoriteFilmsDataLoadingStatus, getFavoriteDataPostingStatus } from '../../store/films-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function MyListBtn({filmId}: {filmId: number}): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmAction());
    }
  }, [authorizationStatus, dispatch]);

  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isFavoriteDataPosting = useAppSelector(getFavoriteDataPostingStatus);
  const isFavoriteFilmsLoading = useAppSelector(getFavoriteFilmsDataLoadingStatus);
  const isFavorite = favoriteFilms.map((film) => film.id).includes(Number(filmId));

  const clickHandler = () => {
    if (isFavoriteDataPosting) {
      return;
    }
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    } else {
      dispatch(postFavoriteStatusAction({
        filmId: filmId,
        status: Number(!isFavorite)
      }));
    }
  };

  return (
    <button onClick={clickHandler} className="btn btn--list film-card__button" type="button">
      <svg viewBox={isFavorite ? '0 0 19 19' : '0 0 19 20'} width="19" height={isFavorite ? '19' : '20'}>
        <use xlinkHref={isFavorite ? '#in-list' : '#add'}></use>
      </svg>
      <span>{isFavoriteFilmsLoading || isFavoriteDataPosting ? 'Loading...' : 'My list'}</span>
      {authorizationStatus === AuthorizationStatus.Auth
        ?
        <span className="film-card__count">{favoriteFilms.length}</span>
        :
        null}
    </button>
  );
}

export default MyListBtn;
