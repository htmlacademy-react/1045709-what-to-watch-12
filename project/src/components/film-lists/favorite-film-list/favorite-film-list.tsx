import { useAppSelector } from '../../../hooks';
import { getFavoriteFilms, getFavoriteFilmsDataLoadingStatus } from '../../../store/films-data/selectors';
import FilmCard from '../../film-card/film-card';
import LoadingScreen from '../../../pages/loading-screen/loading-screen';

function FavoriteFilmList(): JSX.Element {
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isFavoriteFilmsLoading = useAppSelector(getFavoriteFilmsDataLoadingStatus);

  if (isFavoriteFilmsLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="catalog__films-list">
      {favoriteFilms.map((film) =>
        (
          <FilmCard
            key={film.id}
            film={film}
          />
        )
      )}
    </div>
  );
}

export default FavoriteFilmList;
