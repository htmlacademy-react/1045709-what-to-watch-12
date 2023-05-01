import { render, screen } from '@testing-library/react';
import { FiltersByGenre } from '../../const';
import { useAppDispatch } from '../../hooks';
import { BrowserRouter } from 'react-router-dom';
import GenreFiltersList from './genre-filters-list';
import { resetRenderedFilms, changeGenre } from '../../store/film-list/film-list';
import { filterFilmsByGenre } from '../../store/films-data/films-data';

jest.mock('../../hooks');
jest.mock('../../store/film-list/film-list');
jest.mock('../../store/films-data/films-data');

describe('GenreFiltersList component', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render without errors', () => {
    render(
      <BrowserRouter>
        <GenreFiltersList />
      </BrowserRouter>
    );
    expect(screen.getByRole('list')).toBeTruthy();
  });

  it('Should render filter items', () => {
    render(
      <BrowserRouter>
        <GenreFiltersList />
      </BrowserRouter>
    );
    const items = screen.getAllByRole('listitem');
    expect(items.length).toEqual(Object.values(FiltersByGenre).length);
  });

  it('Should dispatch actions on item click', () => {
    render(
      <BrowserRouter>
        <GenreFiltersList />
      </BrowserRouter>
    );
    const items = screen.getAllByRole('listitem');
    items.forEach((item, index) => {
      item.click();
      expect(dispatch).toHaveBeenNthCalledWith(1, resetRenderedFilms());
      expect(dispatch).toHaveBeenNthCalledWith(2, changeGenre(Object.values(FiltersByGenre)[index].filterValue));
      expect(dispatch).toHaveBeenNthCalledWith(3, filterFilmsByGenre(Object.values(FiltersByGenre)[index].filterValue));

      dispatch.mockReset();
    });
  });


});


