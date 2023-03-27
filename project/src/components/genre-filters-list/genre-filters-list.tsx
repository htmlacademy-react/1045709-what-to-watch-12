import { useAppDispatch } from '../../hooks';
import { FiltersByGenre } from '../../const';
import GenreFilterItem from './genre-filter-item/genre-filter-item';
import { changeGenreAction, filterFilmsByGenreAction } from '../../store/action';

function GenreFiltersList(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <ul className="catalog__genres-list">
      {Object.values(FiltersByGenre).map((filter) => (
        <GenreFilterItem key={filter.filterName} filter={filter}
          onClick={() => {
            dispatch(changeGenreAction(filter.filterValue));
            dispatch(filterFilmsByGenreAction(filter.filterValue));
          }}
        />
      ))}
    </ul>
  );
}

export default GenreFiltersList;
