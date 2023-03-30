import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../types/film';
import FilmCardPlayer from './film-card-player/film-card-player';

type FilmCardProps = {
  film: Film;
};

function FilmCard({film}: FilmCardProps): JSX.Element {
  const [isActive, setIsActive] = useState(false);

  const handleOnMouseOver = () => {
    setIsActive(true);
  };

  const handleOnMouseOut = () => {
    setIsActive(false);
  };

  return (
    <article
      onMouseOver={handleOnMouseOver}
      onMouseOut={handleOnMouseOut}
      className="small-film-card catalog__films-card"
    >
      <Link to={`/films/${film.id}/overview`}>
        {
          isActive
            ? <FilmCardPlayer videoSrc={film.filmInfo.videoSrc} posterSrc={film.filmInfo.posterSrc} />
            :
            <div className="small-film-card__image">
              <img src={film.filmInfo.posterSrc} alt={film.filmInfo.title} width="280" height="175" />
            </div>
        }
      </Link>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}/overview`}>{film.filmInfo.title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
