import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';

type GenreFilterItemProps = {
  filter: {
    filterName: string;
    filterValue: string;
  };
  onClick: () => void;
}

function GenreFilterItem({filter, onClick}: GenreFilterItemProps): JSX.Element {
  const activeGenre = useAppSelector((state) => state.genre);
  return (
    <li onClick={onClick} className={`catalog__genres-item ${activeGenre === filter.filterValue ? 'catalog__genres-item--active' : ''}`}>
      <Link to="#" className="catalog__genres-link">{filter.filterName}</Link>
    </li>
  );
}

export default GenreFilterItem;
