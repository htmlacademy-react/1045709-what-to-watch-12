import { Film } from '../../types/film';
import FilmCard from '../film-card/film-card';

const MORE_LIKE_FILMS_QUANTITY = 4;

type MoreLikeFilmsProps = {
  films: Film[];
  filmInPage: Film;
}

function MoreLikeFilms({films, filmInPage}: MoreLikeFilmsProps): JSX.Element {
  const moreLikeFilms = films.filter((film) => film.filmInfo.genre === filmInPage.filmInfo.genre && film.id !== filmInPage.id).slice(0, MORE_LIKE_FILMS_QUANTITY);

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <div className="catalog__films-list">
        {moreLikeFilms.map((film) =>
          (
            <FilmCard key={film.id} film={film}/>
          )
        )}
      </div>
    </section>
  );
}

export default MoreLikeFilms;
