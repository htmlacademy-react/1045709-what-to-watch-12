import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { Film, Films } from '../types/film.js';
import { Reviews, AddReview } from '../types/review.js';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute } from '../const';
import { FavoriteData } from '../types/favorite-data.js';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';

export const fetchFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Films);
    return data;
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.FavoriteFilms);
    return data;
  },
);

export const postFavoriteStatusAction = createAsyncThunk<void, FavoriteData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/postFavoriteStatus',
  async ({filmId, status}, {dispatch, extra: api}) => {
    await api.post<number>(`${APIRoute.FavoriteFilms}/${filmId}/${status}`);
    dispatch(fetchFavoriteFilmsAction());
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<Films, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms',
  async (filmId, {extra: api}) => {
    const {data} = await api.get<Films>(`${APIRoute.Films}/${filmId}/${APIRoute.SimilarFilms}`);
    return data;
  },
);

export const fetchFilmByIdAction = createAsyncThunk<Film, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilmById',
  async (filmId, {extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    return data;
  },
);

export const fetchPromoFilmAction = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.PromoFilm);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (filmId, {extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Reviews}/${filmId}`);
    return data;
  },
);

export const postReviewAction = createAsyncThunk<void, AddReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/postReview',
  async ({comment, rating, filmId}, {dispatch, extra: api}) => {
    await api.post<AddReview>(`${APIRoute.Reviews}/${filmId}`, {comment, rating});
    dispatch(redirectToRoute(`${AppRoute.Films}/${filmId}`));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
