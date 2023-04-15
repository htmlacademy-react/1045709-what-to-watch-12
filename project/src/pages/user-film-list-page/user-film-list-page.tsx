import { useAppSelector } from '../../hooks';
import { getFilms } from '../../store/films-data/selectors';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';

function UserFilmListPage(): JSX.Element {
  const films = useAppSelector(getFilms);
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        < Logo />
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
        < UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        < FilmList />
      </section>

      < Footer />

    </div>
  );
}

export default UserFilmListPage;
