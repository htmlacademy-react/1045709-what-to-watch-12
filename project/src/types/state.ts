import { store } from '../store/index.js';
import { Film, Films } from './film.js';
import { Reviews } from './review.js';
import { AuthorizationStatus } from '../const.js';

export type FilmData = {
  films: {
    data: Films;
    filteredData: Films;
    isLoading: boolean;
  };
  favoriteFilms: {
    data: Films;
    isLoading: boolean;
    isUpdating: boolean;
  };
  similarFilms: {
    data: Films;
    isLoading: boolean;
  };
  film: {
    data: Film | null;
    isLoading: boolean;
  };
  promoFilm: {
    data: Film | null;
    isLoading: boolean;
  };
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
