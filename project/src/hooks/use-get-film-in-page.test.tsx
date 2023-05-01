import { renderHook } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';
import { fetchFilmByIdAction } from '../store/api-actions';
import { makeFakeFilm } from '../utils/mocks';
import useGetFilmInPage from './use-get-film-in-page';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../store/films-data/selectors', () => ({
  getFilm: jest.fn(),
}));

jest.mock('../store/api-actions', () => ({
  fetchFilmByIdAction: jest.fn(),
}));

jest.mock('.', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe('useGetFilmInPage', () => {
  const film = makeFakeFilm();
  const id = film.id;
  const mockedParams = { id };
  const mockedDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue(mockedParams);
    (useAppDispatch as jest.Mock).mockReturnValue(mockedDispatch);
    (useAppSelector as jest.Mock).mockReturnValue(film);
  });

  it('should call fetchFilmByIdAction if there is no film with the given id', () => {
    (useAppSelector as jest.Mock).mockReturnValueOnce(null);

    renderHook(() => useGetFilmInPage());

    expect(fetchFilmByIdAction).toHaveBeenCalledWith(film.id);
    expect(mockedDispatch).toHaveBeenCalledWith(fetchFilmByIdAction(film.id));
  });

  it('should not call fetchFilmByIdAction if there is already a film with the given id', () => {
    (useAppSelector as jest.Mock).mockReturnValueOnce(film);

    renderHook(() => useGetFilmInPage());

    expect(fetchFilmByIdAction).not.toHaveBeenCalled();
    expect(mockedDispatch).not.toHaveBeenCalled();
  });

  it('should return the film', () => {
    const { result } = renderHook(() => useGetFilmInPage());

    expect(result.current).toBe(film);
  });
});
