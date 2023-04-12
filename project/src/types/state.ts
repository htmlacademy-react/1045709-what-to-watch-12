import { store } from '../store/index.js';
import { Films } from './film.js';
import { Reviews } from './review.js';
import { AuthorizationStatus } from '../const.js';

export type FilmData = {
  films: Films;
  filteredFilms: Films;
  isFilmsLoading: boolean;
};

export type FilmList = {
  renderedFilmsQuantity: number;
  activeGenre: string;
};

export type ReviewData = {
  reviews: Reviews;
  isReviewsLoading: boolean;
  isReviewPosting: boolean;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
