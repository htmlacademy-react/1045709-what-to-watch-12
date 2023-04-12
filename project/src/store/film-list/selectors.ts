import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getRenderedFilmsQuantity = (state: State): number => state[NameSpace.FilmList].renderedFilmsQuantity;
export const getActiveGenre = (state: State): string => state[NameSpace.FilmList].activeGenre;
