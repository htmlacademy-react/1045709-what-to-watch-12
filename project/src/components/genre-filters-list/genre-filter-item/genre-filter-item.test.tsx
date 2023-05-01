import { render, screen, fireEvent } from '@testing-library/react';
import GenreFilterItem from './genre-filter-item';
//import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { BrowserRouter } from 'react-router-dom';
// import { getActiveGenre } from '../../../store/film-list/selectors';

jest.mock('../../../hooks');
jest.mock('../../../store/film-list/selectors');

describe('GenreFilterItem component', () => {
  const onClick = jest.fn();
  const activeGenre = 'Action'; // здесь указать активный жанр

  const filter = {
    filterName: 'Action',
    filterValue: 'Action'
  };

  beforeEach(() => {
    (useAppSelector as jest.Mock).mockReturnValue(activeGenre);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render without errors', () => {
    render(
      <BrowserRouter>
        <GenreFilterItem filter={filter} onClick={onClick} />
      </BrowserRouter>
    );
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });

  it('Should display filter name', () => {
    render(
      <BrowserRouter>
        <GenreFilterItem filter={filter} onClick={onClick} />
      </BrowserRouter>
    );
    expect(screen.getByText(filter.filterName)).toBeInTheDocument();
  });

  it('Should add .catalog__genres-item--active class if activeGenre equals filterValue', () => {
    (useAppSelector as jest.Mock).mockReturnValue(filter.filterValue);
    render(
      <BrowserRouter>
        <GenreFilterItem filter={filter} onClick={onClick} />
      </BrowserRouter>
    );
    expect(screen.getByRole('listitem')).toHaveClass('catalog__genres-item--active');
  });

  it('Should call onClick handler when a user clicks list item', () => {
    render(
      <BrowserRouter>
        <GenreFilterItem filter={filter} onClick={onClick} />
      </BrowserRouter>
    );
    const listItem = screen.getByRole('listitem');
    fireEvent.click(listItem);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
