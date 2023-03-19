import { Film } from '../types/film';
import { reviews } from './reviews';

export const films: Film[] = [
  {
    id: 1,
    reviews: [reviews[0], reviews[1], reviews[6]],
    filmInfo: {
      rating: 9.7,
      ratingVotesQuantity: 210,
      duration: 153,
      releaseYear: 2010,
      title: 'What we do in the shadows',
      description: 'consectetur adipisicing elit',
      posterSrc: 'img/what-we-do-in-the-shadows.jpg',
      videoSrc: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
      genre: 'Drama',
      director: 'Takeshi',
      actors: ['Kira']
    }
  },
  {
    id: 2,
    reviews: [reviews[2], reviews[3]],
    filmInfo: {
      rating: 5.3,
      ratingVotesQuantity: 211,
      duration: 215,
      releaseYear: 2011,
      title: 'We need to talk about kevin',
      description: 'ipsum dolor sit ',
      posterSrc: 'img/we-need-to-talk-about-kevin.jpg',
      videoSrc: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
      genre: 'Drama',
      director: 'Loki',
      actors: ['Alex', 'Sam']
    }
  },
  {
    id: 3,
    reviews: [reviews[5]],
    filmInfo: {
      rating: 7.5,
      ratingVotesQuantity: 212,
      duration: 444,
      releaseYear: 2012,
      title: 'No country for old men',
      description: 'Lorem ipsum dolor sit',
      posterSrc: 'img/no-country-for-old-men.jpg',
      videoSrc: 'videoSrc',
      genre: 'Comedian',
      director: 'Rick',
      actors: ['Egor', 'Artem']
    }
  },
  {
    id: 4,
    reviews: [reviews[4]],
    filmInfo: {
      rating: 3.7,
      ratingVotesQuantity: 213,
      duration: 444,
      releaseYear: 2013,
      title: 'title',
      description: 'ipsum dolor sit amet',
      posterSrc: 'img/bg-the-grand-budapest-hotel.jpg',
      videoSrc: 'videoSrc',
      genre: 'Comedian',
      director: 'Takeshi',
      actors: ['Tom', 'Rolan']
    }
  },
  {
    id: 5,
    reviews: [reviews[8], reviews[9], reviews[10]],
    filmInfo: {
      rating: 7.5,
      ratingVotesQuantity: 214,
      duration: 444,
      releaseYear: 2014,
      title: 'title',
      description: 'dolor sit amet consectetur',
      posterSrc: 'img/bg-the-grand-budapest-hotel.jpg',
      videoSrc: 'videoSrc',
      genre: 'genre',
      director: 'Takeshi',
      actors: ['Tom', 'Rolan']
    }
  },
  {
    id: 6,
    reviews: [reviews[10], reviews[11]],
    filmInfo: {
      rating: 5.8,
      ratingVotesQuantity: 215,
      duration: 444,
      releaseYear: 2015,
      title: 'title',
      description: 'sit amet consectetur adipisicing',
      posterSrc: 'img/bg-the-grand-budapest-hotel.jpg',
      videoSrc: 'videoSrc',
      genre: 'genre',
      director: 'Takeshi',
      actors: ['Tom', 'Rolan']
    }
  },
  {
    id: 7,
    reviews: [reviews[4], reviews[2]],
    filmInfo: {
      rating: 6.4,
      ratingVotesQuantity: 216,
      duration: 444,
      releaseYear: 2016,
      title: 'title',
      description: 'consectetur adipisicing elit. sit amet consectetur adipisicing',
      posterSrc: 'img/bg-the-grand-budapest-hotel.jpg',
      videoSrc: 'videoSrc',
      genre: 'genre',
      director: 'Takeshi',
      actors: ['Tom', 'Rolan']
    }
  },
  {
    id: 8,
    reviews: [reviews[7], reviews[1]],
    filmInfo: {
      rating: 8.5,
      ratingVotesQuantity: 217,
      duration: 444,
      releaseYear: 2017,
      title: 'title',
      description: 'dolor sit amet consectetur elit elit',
      posterSrc: 'img/bg-the-grand-budapest-hotel.jpg',
      videoSrc: 'videoSrc',
      genre: 'genre',
      director: 'Takeshi',
      actors: ['Tom', 'Rolan']
    }
  }
];
