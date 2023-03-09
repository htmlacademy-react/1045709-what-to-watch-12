import { Film } from './film';

export type MainPageProps = {
  headerFilm: {
    title: string;
    genre: string;
    year: number;
  };
  films: Film[];
}
