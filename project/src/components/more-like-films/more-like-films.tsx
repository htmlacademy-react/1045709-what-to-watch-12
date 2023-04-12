import { useAppSelector } from '../../hooks';
import { getSimilarFilms } from '../../store/films-data/selectors';
import FilmCard from '../film-card/film-card';

const MORE_LIKE_FILMS_QUANTITY = 4;

function MoreLikeFilms(): JSX.Element {
  const moreLikeFilms = useAppSelector(getSimilarFilms);

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <div className="catalog__films-list">
        {moreLikeFilms.slice(0, MORE_LIKE_FILMS_QUANTITY).map((film) =>
          (
            <FilmCard key={film.id} film={film}/>
          )
        )}
      </div>
    </section>
  );
}

export default MoreLikeFilms;
