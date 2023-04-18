import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteFilmAction } from '../../store/api-actions';
import { getFavoriteFilms } from '../../store/films-data/selectors';
import Logo from '../../components/header/logo/logo';
import UserBlock from '../../components/header/user-block/user-block';
import FavoriteFilmList from '../../components/film-lists/favorite-film-list/favorite-film-list';
import Footer from '../../components/footer/footer';

function FavoriteFilmsPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteFilmAction());
  }, [dispatch]);

  const favoriteFilms = useAppSelector(getFavoriteFilms);

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
        <FavoriteFilmList />
      </section>
      < Footer />
    </div>
  );
}

export default FavoriteFilmsPage;
