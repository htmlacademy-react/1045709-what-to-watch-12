import { Link } from 'react-router-dom';
import { Film } from '../../types/film';

type FilmCardProps = {
  film: Film;
  onMouseEnterHandler: () => void;
};

function FilmCard({film, onMouseEnterHandler}: FilmCardProps): JSX.Element {
  return (
    <article onMouseEnter={onMouseEnterHandler} className="small-film-card catalog__films-card">
      <Link to={`films/${film.id}`}>
        <div className="small-film-card__image">
          <img src={film.filmInfo.posterSrc} alt={film.filmInfo.title} width="280" height="175" />
        </div>
      </Link>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`films/${film.id}`}>{film.filmInfo.title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
