import { createReducer } from '@reduxjs/toolkit';
import { changeGenreAction, filterFilmsByGenreAction } from './action';
import { films } from '../mocks/films';
import { FiltersByGenre } from '../const';

const initialState = {
  genre: 'all',
  films: films
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenreAction, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(filterFilmsByGenreAction, (state, action) => {
      if (action.payload === FiltersByGenre.ALL_GENRES.filterValue) {
        state.films = films;
        return;
      }
      state.films = films.filter((fllm) => fllm.filmInfo.genre === action.payload);
    });
});

export { reducer };
