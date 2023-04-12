import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Film, Films } from '../../types/film';

export const getFilms = (state: State): Films => state[NameSpace.FilmsData].films;
export const getFilteredFilms = (state: State): Films => state[NameSpace.FilmsData].filteredFilms;
export const getSimilarFilms = (state: State): Films => state[NameSpace.FilmsData].similarFilms;
export const getPromoFilm = (state: State): Film => state[NameSpace.FilmsData].promoFilm as Film;
export const getFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.FilmsData].isFilmsLoading;
export const getSimilarFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.FilmsData].isSimilarFilmsLoading;
export const getPromoFilmDataLoadingStatus = (state: State): boolean => state[NameSpace.FilmsData].isPromoFilmLoading;
