import React from 'react';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import PromoFilm from '../../components/promo-film/promo-film';
import GenreFiltersList from '../../components/genre-filters-list/genre-filters-list';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';

function MainPage(): JSX.Element {
  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          < Logo />
          < UserBlock />
        </header>

        <PromoFilm />
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          < GenreFiltersList />
          < FilmList />
        </section>

        < Footer />

      </div>
    </React.Fragment>
  );
}

export default MainPage;
