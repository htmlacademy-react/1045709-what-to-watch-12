import { createReducer } from '@reduxjs/toolkit';
import { changeGenreAction, renderMoreFilms, resetRenderedFilms, filterFilmsByGenreAction, loadFilms, requireAuthorization, setError } from './action';
import { Films } from '../types/film';
import { FiltersByGenre, AuthorizationStatus, DEFAULT_RENDERED_FILMS_QUANTITY, FILMS_TO_RENDER_QUANTITY } from '../const';

type InitialState = {
  genre: string;
  films: Films;
  renderedFilmsQuantity: number;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
}

const initialState: InitialState = {
  genre: FiltersByGenre.ALL_GENRES.filterValue,
  films: [],
  renderedFilmsQuantity: DEFAULT_RENDERED_FILMS_QUANTITY,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
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
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
