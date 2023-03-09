import { useState } from 'react';
import { Film } from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  films: Film[];
}

function FilmList({films}: FilmListProps): JSX.Element {
  const setActiveFilm = useState(0)[1];
  return (
    <div className="catalog__films-list">
      {films.map((film) =>
        (
          <FilmCard
            onMouseEnterHandler={() => {setActiveFilm(film.id);}}
            key={film.id}
            film={film}
          />
        )
      )}
    </div>
  );
}

export default FilmList;
