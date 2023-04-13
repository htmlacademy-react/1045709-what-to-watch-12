import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { filmsData } from './films-data/films-data';
import { reviewsData } from './reviews-data/reviews-data';
import { filmList } from './film-list/film-list';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.FilmsData]: filmsData.reducer,
  [NameSpace.ReviewsData]: reviewsData.reducer,
  [NameSpace.FilmList]: filmList.reducer,
  [NameSpace.User]: userProcess.reducer,
});
