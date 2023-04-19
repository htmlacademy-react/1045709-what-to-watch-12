import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
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
      <Link to={`${AppRoute.Films}/${film.id}`}>
        {
          isActive
            ? <FilmCardPlayer videoSrc={film.videoLink} posterSrc={film.previewImage} />
            :
            <div className="small-film-card__image">
              <img src={film.previewImage} alt={film.name} width="280" height="175" />
            </div>
        }
      </Link>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Films}/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
