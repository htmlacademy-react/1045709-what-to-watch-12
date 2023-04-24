import { useAppDispatch } from '../../hooks';
import { FiltersByGenre } from '../../const';
import { changeGenre, resetRenderedFilms } from '../../store/film-list/film-list';
import GenreFilterItem from './genre-filter-item/genre-filter-item';
import { filterFilmsByGenre } from '../../store/films-data/films-data';

function GenreFiltersList(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <ul className="catalog__genres-list">
      {Object.values(FiltersByGenre).map((filter) => (
        <GenreFilterItem key={filter.filterName} filter={filter}
          onClick={() => {
            dispatch(resetRenderedFilms());
            dispatch(changeGenre(filter.filterValue));
            dispatch(filterFilmsByGenre(filter.filterValue));
          }}
        />
      ))}
    </ul>
  );
}

export default GenreFiltersList;
