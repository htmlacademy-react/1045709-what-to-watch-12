import { datatype, random, internet, name, system, date } from 'faker';
import { Film } from '../types/film';
import { Review } from '../types/review';
import { FiltersByGenre } from '../const';

export const getRandomFilterValue = () => {
  const filters = Object.values(FiltersByGenre);
  const randomNumber = datatype.number({
    'min': 0,
    'max': filters.length - 1
  });
  return filters[randomNumber].filterValue;
};


export const makeFakeFilm = (): Film => ({
  id: datatype.number(),
  name: random.words(),
  posterImage: system.filePath(),
  previewImage: system.filePath(),
  backgroundImage: system.filePath(),
  backgroundColor: internet.color(),
  videoLink: internet.url(),
  previewVideoLink: internet.url(),
  description: random.words(),
  rating: datatype.number(),
  scoresCount: datatype.number(),
  director: name.findName(),
  starring: [name.findName(), name.findName()],
  runTime: datatype.number(),
  genre: getRandomFilterValue(),
  released: datatype.number(),
  isFavorite: datatype.boolean()

} as Film);

export const makeFakeReview = (): Review => ({
  comment: random.words(),
  date: String(date.recent()),
  id: datatype.number(),
  rating: datatype.number(),
  user: {
    id: datatype.number(),
    name: name.findName(),
  }
} as Review);
