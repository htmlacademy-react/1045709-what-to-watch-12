import { Link } from 'react-router-dom';
import useGetFilmInPage from '../../hooks/useGetFilmInPage';
import { Films } from '../../types/film';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import AddReviewForm from '../../components/add-review-form/add-review-form';

type AddReviewPageProps = {
  films: Films;
}

function AddReviewPage({films}: AddReviewPageProps): JSX.Element {
  const filmInReview = useGetFilmInPage(films);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">

          < Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${filmInReview.id}/overview`} className="breadcrumbs__link">{filmInReview.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to="#" className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          < UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={filmInReview.posterImage} alt={filmInReview.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        < AddReviewForm />
      </div>

    </section>
  );
}

export default AddReviewPage;
