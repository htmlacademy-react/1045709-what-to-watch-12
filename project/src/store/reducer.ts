import { createReducer } from '@reduxjs/toolkit';
import { changeGenreAction, renderMoreFilms, resetRenderedFilms, filterFilmsByGenreAction } from './action';
import { films } from '../mocks/films';
import { FiltersByGenre, DEFAULT_RENDERED_FILMS_QUANTITY, FILMS_TO_RENDER_QUANTITY } from '../const';

const initialState = {
  genre: FiltersByGenre.ALL_GENRES.filterValue as string,
  films: films,
  renderedFilmsQuantity: DEFAULT_RENDERED_FILMS_QUANTITY
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenreAction, (state, action) => {
      state.renderedFilmsQuantity = DEFAULT_RENDERED_FILMS_QUANTITY;
      state.genre = action.payload;
    })
    .addCase(renderMoreFilms, (state) => {
      state.renderedFilmsQuantity += FILMS_TO_RENDER_QUANTITY;
    })
    .addCase(resetRenderedFilms, (state) => {
      state.renderedFilmsQuantity = DEFAULT_RENDERED_FILMS_QUANTITY;
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
