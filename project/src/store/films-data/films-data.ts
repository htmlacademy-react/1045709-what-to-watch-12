import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmData } from '../../types/state';
import { fetchFilmAction, fetchSimilarFilmAction, fetchPromoFilmAction } from '../api-actions';
import { FiltersByGenre } from '../../const';

const initialState: FilmData = {
  films: {
    data: [],
    filteredData: [],
    isLoading: false,
  },
  similarFilms: {
    data: [],
    isLoading: false,
  },
  promoFilm: {
    data: null,
    isLoading: false,
  }
};

export const filmsData = createSlice({
  name: NameSpace.FilmsData,
  initialState,
  reducers: {
    filterFilmsByGenre: (state, action) => {
      if (action.payload === FiltersByGenre.ALL_GENRES.filterValue) {
        state.films.filteredData = state.films.data;
        return;
      }
      state.films.filteredData = state.films.data.filter((fllm) => fllm.genre === action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.pending, (state) => {
        state.films.isLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.films.data = action.payload;
        state.films.filteredData = action.payload;
        state.films.isLoading = false;
      })
      .addCase(fetchSimilarFilmAction.pending, (state) => {
        state.similarFilms.isLoading = true;
      })
      .addCase(fetchSimilarFilmAction.fulfilled, (state, action) => {
        state.similarFilms.data = action.payload;
        state.similarFilms.isLoading = false;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.promoFilm.isLoading = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm.data = action.payload;
        state.promoFilm.isLoading = false;
      });
  }
});

export const { filterFilmsByGenre } = filmsData.actions;
