import { useAppSelector } from '../../hooks';
import { getSimilarFilms, getSimilarFilmsDataLoadingStatus } from '../../store/films-data/selectors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import FilmCard from '../film-card/film-card';

const MORE_LIKE_FILMS_QUANTITY = 4;

function MoreLikeFilms(): JSX.Element {
  const moreLikeFilms = useAppSelector(getSimilarFilms);
  const isSimilarFilmsLoading = useAppSelector(getSimilarFilmsDataLoadingStatus);

  if (isSimilarFilmsLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <div className="catalog__films-list">
        {moreLikeFilms.slice(0, MORE_LIKE_FILMS_QUANTITY).map((film) =>
          (
            <FilmCard key={film.id} film={film}/>
          )
        )}
      </div>
    </section>
  );
}

export default MoreLikeFilms;
