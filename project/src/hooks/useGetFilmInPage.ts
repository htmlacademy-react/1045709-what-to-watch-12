import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchFilmByIdAction } from '../store/api-actions';
import { getFilm } from '../store/films-data/selectors';

function useGetFilmInPage() {
  const id = Number(useParams().id);
  const film = useAppSelector(getFilm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (film && film.id === id) {
      return;
    }
    dispatch(fetchFilmByIdAction(id));
  }, [film, id, dispatch]);

  return film;
}

export default useGetFilmInPage;
