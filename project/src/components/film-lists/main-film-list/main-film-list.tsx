import React from 'react';
import { useEffect } from 'react';
import { getFilteredFilms } from '../../../store/films-data/selectors';
import { getRenderedFilmsQuantity } from '../../../store/film-list/selectors';
import { resetRenderedFilms, renderMoreFilms } from '../../../store/film-list/film-list';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import FilmCard from '../../film-card/film-card';
import ShowMoreBtn from './show-more-btn/show-more-btn';

function MainFilmList(): JSX.Element {
  const films = useAppSelector(getFilteredFilms);
  const renderedFilmsQuantity = useAppSelector(getRenderedFilmsQuantity);
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

export default MainFilmList;
