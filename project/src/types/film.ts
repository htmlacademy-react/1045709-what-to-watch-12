import { Review } from './review';

export type Film = {
  id: number;
  reviews: Review[];
  filmInfo: {
    rating: number;
    ratingVotesQuantity: number;
    duration: number;
    releaseYear: number;
    title: string;
    description: string;
    posterSrc: string;
    videoSrc: string;
    genre: string;
    director: string;
    actors: string[];
  };
}
