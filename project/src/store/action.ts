import { createAction } from '@reduxjs/toolkit';

export const changeGenreAction = createAction('/activeGenre', (genre: string) => ({
  payload: genre
}));

export const renderMoreFilms = createAction('/renderedFilms');

export const resetRenderedFilms = createAction('/renderedFilmsByDefault');

export const filterFilmsByGenreAction = createAction('/filmsByGenre', (genre: string) => ({
  payload: genre
}));
