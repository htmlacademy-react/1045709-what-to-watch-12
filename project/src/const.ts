export enum AppRoute {
  Root = '/',
  Login = '/login',
  MyList = '/mylist',
  VideoPlayer = '/player',
  Films = '/films',
  Film = '/films/:id',
  FilmTab = ':tab',
  FilmDetailsTab = 'details',
  FilmReviewsTab = 'reviews',
  FilmAddReview = 'review',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  FavoriteFilms = '/favorite',
  SimilarFilms = 'similar',
  PromoFilm = '/promo',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum NameSpace {
  FilmsData = 'FILMS_DATA',
  ReviewsData = 'REVIEWS_DATA',
  FilmList = 'FILM_LIST',
  User = 'USER',
}

export const FiltersByGenre = {
  All: {
    filterName: 'All genres',
    filterValue: 'All'
  },
  Comedies: {
    filterName: 'Comedies',
    filterValue: 'Comedy'
  },
  Crime: {
    filterName: 'Crime',
    filterValue: 'Crime'
  },
  Documentary: {
    filterName: 'Documentary',
    filterValue: 'Documentary'
  },
  Dramas: {
    filterName: 'Dramas',
    filterValue: 'Drama'
  },
  Horror: {
    filterName: 'Horror',
    filterValue: 'Horror'
  },
  KidsFamily: {
    filterName: 'Kids & Family',
    filterValue: 'Family'
  },
  Romance: {
    filterName: 'Romance',
    filterValue: 'Romance'
  },
  SciFi: {
    filterName: 'Sci-Fi',
    filterValue: 'SciFi'
  },
  Thrillers: {
    filterName: 'Thrillers',
    filterValue: 'Thriller'
  },
} as const;

export const RatingValues = {
  Bad: {
    startValue: 0,
    text: 'Bad'
  },
  Normal: {
    startValue: 3,
    text: 'Normal'
  },
  Good: {
    startValue: 5,
    text: 'Good'
  },
  VeryGood: {
    startValue: 8,
    text: 'Very good'
  },
  Awesome: {
    startValue: 10,
    text: 'Awesome'
  }
} as const;

export const DEFAULT_RENDERED_FILMS_QUANTITY = 8;
export const FILMS_TO_RENDER_QUANTITY = 8;

export const REDIRECT_TO_ROUTE_ACTION_TYPE = '/redirectToRoute';
