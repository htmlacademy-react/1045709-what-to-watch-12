import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Film, Films } from '../../types/film';


export const getFilms = (state: State): Films => state[NameSpace.FilmsData].films.data;
export const getFilteredFilms = (state: State): Films => state[NameSpace.FilmsData].films.filteredData;
export const getFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.FilmsData].films.isLoading;

export const getFavoriteFilms = (state: State): Films => state[NameSpace.FilmsData].favoriteFilms.data;
export const getFavoriteFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.FilmsData].favoriteFilms.isLoading;
export const getFavoriteDataPostingStatus = (state: State): boolean => state[NameSpace.FilmsData].favoriteFilms.isUpdating;

export const getFilm = (state: State): Film => state[NameSpace.FilmsData].film.data as Film;
export const getFilmDataLoadingStatus = (state: State): boolean => state[NameSpace.FilmsData].film.isLoading;

export const getPromoFilm = (state: State): Film => state[NameSpace.FilmsData].promoFilm.data as Film;
export const getPromoFilmDataLoadingStatus = (state: State): boolean => state[NameSpace.FilmsData].promoFilm.isLoading;

export const getSimilarFilms = (state: State): Films => state[NameSpace.FilmsData].similarFilms.data;
export const getSimilarFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.FilmsData].similarFilms.isLoading;
