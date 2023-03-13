import { useParams } from 'react-router-dom';
import { Film } from '../types/film';

function useGetFilmInPage(films: Film[]) {
  const params = useParams();
  return films.find((film) => film.id === Number(params.id));
}

export default useGetFilmInPage;
