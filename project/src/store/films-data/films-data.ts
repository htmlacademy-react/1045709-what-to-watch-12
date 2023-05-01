import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { NameSpace } from '../../const';
import { FilmData } from '../../types/state';
import { fetchFilmsAction, fetchFavoriteFilmsAction, postFavoriteStatusAction, fetchSimilarFilmsAction, fetchFilmByIdAction, fetchPromoFilmAction } from '../api-actions';
import { FiltersByGenre } from '../../const';

export const initialState: FilmData = {
  films: {
    data: [],
    filteredData: [],
    isLoading: false,
  },
  favoriteFilms: {
    data: [],
    isLoading: false,
    isUpdating: false,
  },
  similarFilms: {
    data: [],
    isLoading: false,
  },
  film: {
    data: null,
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
      if (action.payload === FiltersByGenre.All.filterValue) {
        state.films.filteredData = state.films.data;
        return;
      }
      state.films.filteredData = state.films.data.filter((fllm) => fllm.genre === action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.films.isLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films.data = action.payload;
        state.films.filteredData = action.payload;
        state.films.isLoading = false;
      })

      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.favoriteFilms.isLoading = true;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms.data = action.payload;
        state.favoriteFilms.isLoading = false;
      })

      .addCase(postFavoriteStatusAction.pending, (state) => {
        state.favoriteFilms.isUpdating = true;
      })
      .addCase(postFavoriteStatusAction.fulfilled, (state) => {
        state.favoriteFilms.isUpdating = false;
      })
      .addCase(postFavoriteStatusAction.rejected, (state, action) => {
        state.favoriteFilms.isUpdating = false;
        toast.error(action.error.message);
      })

      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.similarFilms.isLoading = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms.data = action.payload;
        state.similarFilms.isLoading = false;
      })

      .addCase(fetchFilmByIdAction.pending, (state) => {
        state.film.isLoading = true;
      })
      .addCase(fetchFilmByIdAction.fulfilled, (state, action) => {
        state.film.isLoading = false;
        state.film.data = action.payload;
      })
      .addCase(fetchFilmByIdAction.rejected, (state) => {
        state.film.isLoading = false;
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
