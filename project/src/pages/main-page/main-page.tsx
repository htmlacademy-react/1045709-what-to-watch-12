import React from 'react';
import PromoFilm from '../../components/promo-film/promo-film';
import GenreFiltersList from '../../components/genre-filters-list/genre-filters-list';
import MainFilmList from '../../components/film-lists/main-film-list/main-film-list';
import Footer from '../../components/footer/footer';

function MainPage(): JSX.Element {
  return (
    <React.Fragment>
      <section className="film-card">
        <PromoFilm />
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          < GenreFiltersList />
          < MainFilmList />
        </section>

        < Footer />

      </div>
    </React.Fragment>
  );
}

export default MainPage;
