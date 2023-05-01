import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, FiltersByGenre, DEFAULT_RENDERED_FILMS_QUANTITY, FILMS_TO_RENDER_QUANTITY } from '../../const';
import { FilmList } from '../../types/state';

const initialState: FilmList = {
  renderedFilmsQuantity: DEFAULT_RENDERED_FILMS_QUANTITY,
  activeGenre: FiltersByGenre.All.filterValue,
};

export const filmList = createSlice({
  name: NameSpace.FilmList,
  initialState,
  reducers: {
    renderMoreFilms: (state) => {
      state.renderedFilmsQuantity += FILMS_TO_RENDER_QUANTITY;
    },
    resetRenderedFilms: (state) => {
      state.renderedFilmsQuantity = DEFAULT_RENDERED_FILMS_QUANTITY;
    },
    changeGenre: (state, action: PayloadAction<string>) => {
      state.activeGenre = action.payload;
    }
  },
});

export const { renderMoreFilms, resetRenderedFilms, changeGenre } = filmList.actions;
