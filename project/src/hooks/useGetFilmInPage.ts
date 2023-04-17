import { useParams } from 'react-router-dom';
import { useAppSelector } from '.';
import { getFilms } from '../store/films-data/selectors';
import { Film } from '../types/film';

function useGetFilmInPage() {
  const params = useParams();
  const films = useAppSelector(getFilms);
  return films.find((film) => film.id === Number(params.id)) as Film;
}

export default useGetFilmInPage;
