import { createAction } from '@reduxjs/toolkit';

export const changeGenreAction = createAction('/activeGenre', (genre: string) => ({
  payload: genre
}));

export const filterFilmsByGenreAction = createAction('/filmsByGenre', (genre: string) => ({
  payload: genre
}));
