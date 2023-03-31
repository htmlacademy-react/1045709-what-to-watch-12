import React from 'react';
import { useEffect } from 'react';
import { renderMoreFilms, resetRenderedFilms } from '../../store/action';
import { useAppSelector, useAppDispatch } from '../../hooks';
import FilmCard from '../film-card/film-card';
import ShowMoreBtn from '../show-more-btn/show-more-btn';

function FilmList(): JSX.Element {
  const films = useAppSelector((state) => state.films);
  const renderedFilmsQuantity = useAppSelector((state) => state.renderedFilmsQuantity);
  const dispatch = useAppDispatch();

  useEffect(() => () => {
    dispatch(resetRenderedFilms());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="catalog__films-list">
        {films.slice(0, renderedFilmsQuantity).map((film) =>
          (
            <FilmCard
              key={film.id}
              film={film}
            />
          )
        )}
      </div>
      {renderedFilmsQuantity >= films.length ? null :
        <ShowMoreBtn
          onClickHandler={() => {
            dispatch(renderMoreFilms());
          }}
        />}
    </React.Fragment>
  );
}

export default FilmList;
