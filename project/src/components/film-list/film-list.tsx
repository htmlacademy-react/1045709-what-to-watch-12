import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import FilmCard from '../film-card/film-card';

function FilmList(): JSX.Element {
  const [, setActiveFilm] = useState(0);
  const films = useAppSelector((state) => state.films);

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
