import { Film } from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  films: Film[];
}

function FilmList({films}: FilmListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.map((film) =>
        <FilmCard key={film.id} title={film.filmInfo.title} posterSrc={film.filmInfo.posterSrc}></FilmCard>
      )}
    </div>
  );
}

export default FilmList;
