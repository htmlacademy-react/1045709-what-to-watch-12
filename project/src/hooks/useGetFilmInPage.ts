import { useParams } from 'react-router-dom';
import { Film, Films } from '../types/film';

function useGetFilmInPage(films: Films) {
  const params = useParams();
  return films.find((film) => film.id === Number(params.id)) as Film;
}

export default useGetFilmInPage;
