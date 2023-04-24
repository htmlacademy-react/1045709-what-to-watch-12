import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { checkAuthAction, loginAction, fetchFilmsAction, logoutAction, fetchFavoriteFilmsAction, fetchFilmByIdAction, fetchPromoFilmAction, fetchSimilarFilmsAction, fetchReviewsAction, postReviewAction, postFavoriteStatusAction } from './api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { AuthData } from '../types/auth-data';
import { makeFakeFilm, makeFakeReview } from '../utils/mocks';
import { redirectToRoute } from './action';
import { AddReview } from '../types/review';
import { FavoriteData } from '../types/favorite-data';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  describe('authorization actions', () => {
    it('should authorization status is «auth» when server return 200', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Login)
        .reply(200, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);
    });

    it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
      const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

      mockAPI
        .onPost(APIRoute.Login)
        .reply(200, {token: 'secret'});


      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(loginAction(fakeUser));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type
      ]);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', 'secret');
    });

    it('should dispatch Logout when Delete /logout', async () => {
      mockAPI
        .onDelete(APIRoute.Logout)
        .reply(204);

      const store = mockStore();
      Storage.prototype.removeItem = jest.fn();

      await store.dispatch(logoutAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type
      ]);

      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
    });


  });


  describe('get films actions', () => {
    it('should dispatch Load_Films when GET /films', async () => {
      const mockFilms = [makeFakeFilm(), makeFakeFilm()];
      mockAPI
        .onGet(APIRoute.Films)
        .reply(200, mockFilms);

      const store = mockStore();

      await store.dispatch(fetchFilmsAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type
      ]);
    });

    it('should dispatch Load_SimilarFilms when GET /films/:id/similar', async () => {
      const mockFilm = makeFakeFilm();
      const mockFilms = [makeFakeFilm(), makeFakeFilm()];
      mockAPI
        .onGet(`${APIRoute.Films}/${mockFilm.id}/${APIRoute.SimilarFilms}`)
        .reply(200, mockFilms);

      const store = mockStore();

      await store.dispatch(fetchSimilarFilmsAction(mockFilm.id));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.fulfilled.type
      ]);
    });


  });


  describe('favorite films actions', () => {
    it('should dispatch Load_FavoriteFilms when GET /favorite', async () => {
      const mockFilms = [makeFakeFilm(), makeFakeFilm()];
      mockAPI
        .onGet(APIRoute.FavoriteFilms)
        .reply(200, mockFilms);

      const store = mockStore();

      await store.dispatch(fetchFavoriteFilmsAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.fulfilled.type
      ]);
    });

    it('should update FavoriteFilms when POST /favorite/:id/status', async () => {
      const mockFilm = makeFakeFilm();
      const status = mockFilm.isFavorite ? 0 : 1;
      const fakeFavoriteData: FavoriteData = {filmId: mockFilm.id, status: status};

      mockAPI
        .onPost(`${APIRoute.FavoriteFilms}/${mockFilm.id}/${status}`)
        .reply(200);

      const store = mockStore();

      await store.dispatch(postFavoriteStatusAction(fakeFavoriteData));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        postFavoriteStatusAction.pending.type,
        fetchFavoriteFilmsAction.pending.type,
        postFavoriteStatusAction.fulfilled.type
      ]);

    });


  });


  describe('get film actions', () => {
    it('should dispatch Load_Film when GET /films/:id', async () => {
      const mockFilm = makeFakeFilm();
      mockAPI
        .onGet(`${APIRoute.Films}/${mockFilm.id}`)
        .reply(200, mockFilm);

      const store = mockStore();

      await store.dispatch(fetchFilmByIdAction(mockFilm.id));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFilmByIdAction.pending.type,
        fetchFilmByIdAction.fulfilled.type
      ]);
    });

    it('should dispatch Load_PromoFilm when GET /promo', async () => {
      const mockFilm = makeFakeFilm();
      mockAPI
        .onGet(APIRoute.PromoFilm)
        .reply(200, mockFilm);

      const store = mockStore();

      await store.dispatch(fetchPromoFilmAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.fulfilled.type
      ]);
    });


  });


  describe('reviews actions', () => {
    it('should dispatch Load_Reviews when GET /comments/:id', async () => {
      const mockFilm = makeFakeFilm();
      const mockReviews = [makeFakeReview(), makeFakeReview()];
      mockAPI
        .onGet(`${APIRoute.Reviews}/${mockFilm.id}`)
        .reply(200, mockReviews);

      const store = mockStore();

      await store.dispatch(fetchReviewsAction(mockFilm.id));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type
      ]);
    });

    it('should dispatch Review and RedirectToRoute when POST /fims/:id', async () => {
      const fakeReview: AddReview = {comment: 'test comment', rating: 8, filmId: 3};

      mockAPI
        .onPost(`${APIRoute.Reviews}/${3}`)
        .reply(200);

      const store = mockStore();

      await store.dispatch(postReviewAction(fakeReview));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        postReviewAction.pending.type,
        redirectToRoute.type,
        postReviewAction.fulfilled.type
      ]);

    });

  });


});
