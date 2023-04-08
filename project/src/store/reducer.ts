import { createReducer } from '@reduxjs/toolkit';
import { changeGenreAction, renderMoreFilms, resetRenderedFilms, filterFilmsByGenreAction, loadFilms, loadReviews, setFilmsDataLoadingStatus, requireAuthorization, setReviewsDataLoadingStatus, setReviewDataPostingStatus } from './action';
import { Films } from '../types/film';
import { Reviews } from '../types/review';
import { FiltersByGenre, AuthorizationStatus, DEFAULT_RENDERED_FILMS_QUANTITY, FILMS_TO_RENDER_QUANTITY } from '../const';

type InitialState = {
  genre: string;
  films: Films;
  filteredFilms: Films;
  reviews: {
    data: Reviews;
    isLoading: boolean;
    isPosting: boolean;
  };
  renderedFilmsQuantity: number;
  authorizationStatus: AuthorizationStatus;
  isFilmsDataLoading: boolean;
}

const initialState: InitialState = {
  genre: FiltersByGenre.ALL_GENRES.filterValue,
  films: [],
  filteredFilms: [],
  reviews: {
    data: [],
    isLoading: false,
    isPosting: false
  },
  renderedFilmsQuantity: DEFAULT_RENDERED_FILMS_QUANTITY,
  authorizationStatus: AuthorizationStatus.Unknown,
  isFilmsDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenreAction, (state, action) => {
      state.renderedFilmsQuantity = DEFAULT_RENDERED_FILMS_QUANTITY;
      state.genre = action.payload;
    })
    .addCase(filterFilmsByGenreAction, (state, action) => {
      if (action.payload === FiltersByGenre.ALL_GENRES.filterValue) {
        state.filteredFilms = state.films;
        return;
      }
      state.filteredFilms = state.films.filter((fllm) => fllm.genre === action.payload);
    })
    .addCase(renderMoreFilms, (state) => {
      state.renderedFilmsQuantity += FILMS_TO_RENDER_QUANTITY;
    })
    .addCase(resetRenderedFilms, (state) => {
      state.renderedFilmsQuantity = DEFAULT_RENDERED_FILMS_QUANTITY;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.filteredFilms = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews.data = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(setReviewsDataLoadingStatus, (state, action) => {
      state.reviews.isLoading = action.payload;
    })
    .addCase(setReviewDataPostingStatus, (state, action) => {
      state.reviews.isPosting = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export { reducer };
