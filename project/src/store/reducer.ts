import { createReducer } from '@reduxjs/toolkit';
import { changeGenreAction, renderMoreFilms, resetRenderedFilms, filterFilmsByGenreAction, loadFilms, loadReviews, setFilmsDataLoadingStatus, requireAuthorization, setReviewsDataLoadingStatus, setReviewDataPostingStatus } from './action';
import { Films } from '../types/film';
import { Reviews } from '../types/review';
import { FiltersByGenre, AuthorizationStatus, DEFAULT_RENDERED_FILMS_QUANTITY, FILMS_TO_RENDER_QUANTITY } from '../const';

type InitialState = {
  films: {
    data: Films;
    filteredData: Films;
    activeGenre: string;
    isLoading: boolean;
  };
  reviews: {
    data: Reviews;
    isLoading: boolean;
    isPosting: boolean;
  };
  renderedFilmsQuantity: number;
  authorizationStatus: AuthorizationStatus;
}

const initialState: InitialState = {
  films: {
    data: [],
    filteredData: [],
    activeGenre: FiltersByGenre.ALL_GENRES.filterValue,
    isLoading: false
  },
  reviews: {
    data: [],
    isLoading: false,
    isPosting: false
  },
  renderedFilmsQuantity: DEFAULT_RENDERED_FILMS_QUANTITY,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenreAction, (state, action) => {
      state.renderedFilmsQuantity = DEFAULT_RENDERED_FILMS_QUANTITY;
      state.films.activeGenre = action.payload;
    })
    .addCase(filterFilmsByGenreAction, (state, action) => {
      if (action.payload === FiltersByGenre.ALL_GENRES.filterValue) {
        state.films.filteredData = state.films.data;
        return;
      }
      state.films.filteredData = state.films.data.filter((fllm) => fllm.genre === action.payload);
    })
    .addCase(renderMoreFilms, (state) => {
      state.renderedFilmsQuantity += FILMS_TO_RENDER_QUANTITY;
    })
    .addCase(resetRenderedFilms, (state) => {
      state.renderedFilmsQuantity = DEFAULT_RENDERED_FILMS_QUANTITY;
    })
    .addCase(loadFilms, (state, action) => {
      state.films.data = action.payload;
      state.films.filteredData = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews.data = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.films.isLoading = action.payload;
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
