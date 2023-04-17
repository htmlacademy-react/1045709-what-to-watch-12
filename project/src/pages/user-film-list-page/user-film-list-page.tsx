import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteFilmAction } from '../../store/api-actions';
import { getFavoriteFilms, getFavoriteFilmsDataLoadingStatus } from '../../store/films-data/selectors';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import FilmCard from '../../components/film-card/film-card';
import LoadingScreen from '../loading-screen/loading-screen';
import Footer from '../../components/footer/footer';

function UserFilmListPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteFilmAction());
  }, [dispatch]);

  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isFavoriteFilmsLoading = useAppSelector(getFavoriteFilmsDataLoadingStatus);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        < Logo />
        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">{favoriteFilms.length}</span>
        </h1>
        < UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        {isFavoriteFilmsLoading ? <LoadingScreen /> :
          <div className="catalog__films-list">
            {favoriteFilms.map((film) =>
              (
                <FilmCard
                  key={film.id}
                  film={film}
                />
              )
            )}
          </div>}

      </section>
      < Footer />
    </div>
  );
}

export default UserFilmListPage;
