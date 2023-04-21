import { Link } from 'react-router-dom';
import { getFilmDataLoadingStatus } from '../../store/films-data/selectors';
import { AppRoute } from '../../const';
import useGetFilmInPage from '../../hooks/useGetFilmInPage';
import NotFoundPage from '../not-found-page/not-found-page';
import Logo from '../../components/header/logo/logo';
import UserBlock from '../../components/header/user-block/user-block';
import AddReviewForm from '../../components/forms/add-review-form/add-review-form';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';

function AddReviewPage(): JSX.Element {
  const filmInReview = useGetFilmInPage();
  const isFilmDataLoading = useAppSelector(getFilmDataLoadingStatus);

  if (isFilmDataLoading) {
    return <LoadingScreen />;
  }

  if (!filmInReview) {
    return <NotFoundPage />;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={filmInReview.backgroundImage} alt={filmInReview.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">

          < Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Films}/${filmInReview.id}`} className="breadcrumbs__link">{filmInReview.name}</Link>
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
        <AddReviewForm filmInReview={filmInReview} />
      </div>

    </section>
  );
}

export default AddReviewPage;
