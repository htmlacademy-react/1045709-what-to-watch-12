import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Films } from '../../types/film';

export const getFilms = (state: State): Films => state[NameSpace.FilmsData].films;
export const getFilteredFilms = (state: State): Films => state[NameSpace.FilmsData].filteredFilms;
export const getFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.FilmsData].isFilmsLoading;
