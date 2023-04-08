import { createAction } from '@reduxjs/toolkit';
import { Films } from '../types/film';
import { Reviews } from '../types/review';
import { AuthorizationStatus, REDIRECT_TO_ROUTE_ACTION_TYPE } from '../const';

export const changeGenreAction = createAction<string>('/activeGenre');

export const renderMoreFilms = createAction('/renderedFilms');

export const resetRenderedFilms = createAction('/renderedFilmsByDefault');

export const filterFilmsByGenreAction = createAction<string>('/filmsByGenre');

export const loadFilms = createAction<Films>('data/loadFilms');

export const loadReviews = createAction<Reviews>('data/loadReviews');

export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');

export const setReviewsDataLoadingStatus = createAction<boolean>('data/setReviewsDataLoadingStatus');

export const setReviewDataPostingStatus = createAction<boolean>('data/setReviewDataPostingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<string>(REDIRECT_TO_ROUTE_ACTION_TYPE);
