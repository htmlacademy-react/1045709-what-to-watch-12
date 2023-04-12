import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmData } from '../../types/state';
import { fetchFilmAction, fetchPromoFilmAction } from '../api-actions';
import { FiltersByGenre } from '../../const';

const initialState: FilmData = {
  films: [],
  filteredFilms: [],
  promoFilm: null,
  isFilmsLoading: false,
};

export const filmsData = createSlice({
  name: NameSpace.FilmsData,
  initialState,
  reducers: {
    filterFilmsByGenre: (state, action) => {
      if (action.payload === FiltersByGenre.ALL_GENRES.filterValue) {
        state.filteredFilms = state.films;
        return;
      }
      state.filteredFilms = state.films.filter((fllm) => fllm.genre === action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.pending, (state) => {
        state.isFilmsLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.filteredFilms = action.payload;
        state.isFilmsLoading = false;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      });
  }
});

export const { filterFilmsByGenre } = filmsData.actions;
