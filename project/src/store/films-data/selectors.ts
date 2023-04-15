import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Film, Films } from '../../types/film';


export const getFilms = (state: State): Films => state[NameSpace.FilmsData].films.data;
export const getFilteredFilms = (state: State): Films => state[NameSpace.FilmsData].films.filteredData;
export const getFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.FilmsData].films.isLoading;

export const getPromoFilm = (state: State): Film => state[NameSpace.FilmsData].promoFilm.data as Film;
export const getPromoFilmDataLoadingStatus = (state: State): boolean => state[NameSpace.FilmsData].promoFilm.isLoading;

export const getSimilarFilms = (state: State): Films => state[NameSpace.FilmsData].similarFilms.data;
export const getSimilarFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.FilmsData].similarFilms.isLoading;
