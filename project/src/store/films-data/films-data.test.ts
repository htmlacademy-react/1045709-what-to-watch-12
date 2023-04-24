import { toast } from 'react-toastify';
import { filmsData, initialState, filterFilmsByGenre } from './films-data';
import { getRandomFilterValue } from '../../utils/mocks';
import { makeFakeFilm } from '../../utils/mocks';
import { fetchFilmsAction, fetchFavoriteFilmsAction, postFavoriteStatusAction, fetchSimilarFilmsAction, fetchFilmByIdAction, fetchPromoFilmAction } from '../api-actions';

const films = [makeFakeFilm(), makeFakeFilm()];
const film = makeFakeFilm();

jest.mock('react-toastify');

describe('Reducer: filterFilmsByGenre', () => {

  it('should set filteredData by a given genre value', () => {
    const state = {
      ...initialState,
      films: {
        ...initialState.films,
        data: films,
        filteredData: films
      }
    };

    const genre = getRandomFilterValue();
    let filteredFilms = films.filter((filmObj) => filmObj.genre === genre);
    if (genre === 'All') {
      filteredFilms = films;
    }

    expect(filmsData.reducer(state, filterFilmsByGenre(genre)))
      .toEqual({
        ...state,
        films: {
          ...state.films,
          filteredData: filteredFilms
        }
      });
  });

});


describe('extraReducers: filmsData', () => {

  it('without additional parameters should return initial state', () => {
    expect(filmsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({...initialState});
  });


  describe('films test', () => {
    it('should set films.isLoading to true on fetchFilmsAction.pending', () => {
      expect(
        filmsData.reducer({...initialState}, {type: fetchFilmsAction.pending.type})
      ).toEqual({
        ...initialState,
        films: {
          ...initialState.films,
          isLoading: true
        }
      });
    });

    it('should update films and filteredFilms by load films + set films.loading to false', () => {
      expect(filmsData.reducer({...initialState}, {type: fetchFilmsAction.fulfilled.type, payload: films}))
        .toEqual({
          ...initialState,
          films: {
            ...initialState.films,
            data: films,
            filteredData: films,
            isLoading: false
          }
        });
    });


  });


  describe('favoriteFilms test', () => {
    it('should set favoriteFilms.isLoading to true on fetchFavoriteFilmsAction.pending', () => {
      expect(
        filmsData.reducer({...initialState}, {type: fetchFavoriteFilmsAction.pending.type})
      ).toEqual({
        ...initialState,
        favoriteFilms: {
          ...initialState.favoriteFilms,
          isLoading: true
        }
      });
    });

    it('should update favoriteFilms by load films + set favoriteFilms.loading to false', () => {
      expect(filmsData.reducer({...initialState}, {type: fetchFavoriteFilmsAction.fulfilled.type, payload: films}))
        .toEqual({
          ...initialState,
          favoriteFilms: {
            ...initialState.favoriteFilms,
            data: films,
            isLoading: false
          }
        });
    });


  });


  describe('postFavoriteStatusAction test', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should set favoriteFilms isUpdating to true when postFavoriteStatusAction.pending is called', () => {
      expect(filmsData.reducer({...initialState}, {type: postFavoriteStatusAction.pending.type}))
        .toEqual({
          ...initialState,
          favoriteFilms: {
            ...initialState.favoriteFilms,
            isUpdating: true
          }
        });
    });

    it('should set favoriteFilms isUpdating to false when postFavoriteStatusAction.fulfilled is called', () => {
      expect(filmsData.reducer({...initialState}, {type: postFavoriteStatusAction.fulfilled.type}))
        .toEqual({
          ...initialState,
          favoriteFilms: {
            ...initialState.favoriteFilms,
            isUpdating: false
          }
        });
    });

    it('should set favoriteFilms isUpdating to false & show error when postFavoriteStatusAction.rejected is called', () => {
      const errorMsg = 'An error occurred';
      const action = {
        type: postFavoriteStatusAction.rejected.type,
        payload: { arg: null, requestStatus: 'rejected', requestId: '', aborted: false, condition: true },
        error: { message: errorMsg },
      };
      expect(filmsData.reducer({...initialState}, action))
        .toEqual({
          ...initialState,
          favoriteFilms: {
            ...initialState.favoriteFilms,
            isUpdating: false
          }
        });
      expect(toast.error).toHaveBeenCalledWith(errorMsg);
    });


  });


  describe('similarFilms test', () => {
    it('should set similarFilms.isLoading to true on fetchSimilarFilmsAction.pending', () => {
      expect(
        filmsData.reducer({...initialState}, {type: fetchSimilarFilmsAction.pending.type})
      ).toEqual({
        ...initialState,
        similarFilms: {
          ...initialState.similarFilms,
          isLoading: true
        }
      });
    });

    it('should update similarFilms by load films + set similarFilms.loading to false', () => {
      expect(filmsData.reducer({...initialState}, {type: fetchSimilarFilmsAction.fulfilled.type, payload: films}))
        .toEqual({
          ...initialState,
          similarFilms: {
            ...initialState.similarFilms,
            data: films,
            isLoading: false
          }
        });
    });


  });


  describe('filmById test', () => {
    it('should set film.isLoading to true on fetchFilmByIdAction.pending', () => {
      expect(
        filmsData.reducer({...initialState}, {type: fetchFilmByIdAction.pending.type})
      ).toEqual({
        ...initialState,
        film: {
          ...initialState.film,
          isLoading: true
        }
      });
    });

    it('should update film by load film + set film.loading to false', () => {
      expect(filmsData.reducer({...initialState}, {type: fetchFilmByIdAction.fulfilled.type, payload: film}))
        .toEqual({
          ...initialState,
          film: {
            ...initialState.film,
            data: film,
            isLoading: false
          }
        });
    });

    it('should set film.isLoading to false on fetchFilmByIdAction.rejected', () => {
      expect(filmsData.reducer({...initialState}, {type: fetchFilmByIdAction.rejected.type}))
        .toEqual({
          ...initialState,
          film: {
            ...initialState.film,
            isLoading: false
          }
        });
    });


  });


  describe('promoFilm test', () => {
    it('should set promoFilm.isLoading to true on fetchPromoFilmAction.pending', () => {
      expect(
        filmsData.reducer({...initialState}, {type: fetchPromoFilmAction.pending.type})
      ).toEqual({
        ...initialState,
        promoFilm: {
          ...initialState.promoFilm,
          isLoading: true
        }
      });
    });

    it('should update promoFilm by load film + set promoFilm.loading to false', () => {
      expect(filmsData.reducer({...initialState}, {type: fetchPromoFilmAction.fulfilled.type, payload: film}))
        .toEqual({
          ...initialState,
          promoFilm: {
            ...initialState.promoFilm,
            data: film,
            isLoading: false
          }
        });
    });


  });


});
