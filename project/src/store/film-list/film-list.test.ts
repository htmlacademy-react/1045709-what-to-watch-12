import { filmList } from './film-list';
import { renderMoreFilms, resetRenderedFilms, changeGenre } from './film-list';
import { getRandomFilterValue } from '../../utils/mocks';

describe('Reducer: filmList', () => {
  it('without additional parameters should return initial state', () => {
    expect(filmList.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        renderedFilmsQuantity: 8,
        activeGenre: 'All'
      });
  });

  it('should increase number of renderedFilmsQuantity by 8', () => {
    const state = {
      renderedFilmsQuantity: 8,
      activeGenre: 'All'
    };

    expect(filmList.reducer(state, renderMoreFilms()))
      .toEqual({
        renderedFilmsQuantity: 16,
        activeGenre: 'All'
      });
  });

  it('should have reset renderedFilmsQuantity', () => {
    expect(filmList.reducer({renderedFilmsQuantity: 20, activeGenre: 'All'}, resetRenderedFilms()))
      .toEqual({renderedFilmsQuantity: 8, activeGenre: 'All'});

    expect(filmList.reducer({renderedFilmsQuantity: 8, activeGenre: 'Comedy'}, resetRenderedFilms()))
      .toEqual({renderedFilmsQuantity: 8, activeGenre: 'Comedy'});

  });

  it('should change active genre by a given value', () => {
    const genre = getRandomFilterValue();
    const state = {
      renderedFilmsQuantity: 8,
      activeGenre: genre
    };
    expect(filmList.reducer(state, changeGenre(genre)))
      .toEqual({
        renderedFilmsQuantity: 8,
        activeGenre: genre
      });
  });


});
