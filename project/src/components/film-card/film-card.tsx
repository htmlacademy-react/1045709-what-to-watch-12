type FilmCardProps = {
  title: string;
  posterSrc: string;
  onMouseEnterHandler: () => void;
};

function FilmCard({title, posterSrc, onMouseEnterHandler}: FilmCardProps): JSX.Element {
  return (
    <article onMouseEnter={onMouseEnterHandler} className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={posterSrc} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{title}</a>
      </h3>
    </article>
  );
}

export default FilmCard;
