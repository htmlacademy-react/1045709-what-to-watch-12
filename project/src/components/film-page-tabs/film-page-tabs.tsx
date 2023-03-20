import { useParams } from 'react-router-dom';
import { Film } from '../../types/film';
import OverviewTab from './overview-tab/overview-tab';
import DetailsTab from './details-tab/details-tab';
import ReviewTab from './review-tab/review-tab';

type FilmPageTabsProps = {
  film: Film;
}

function getTabContent(film: Film, activeTab: string) {
  switch (activeTab) {
    case 'details':
      return <DetailsTab film={film} />;
    case 'reviews':
      return <ReviewTab film={film} />;
    default:
      return <OverviewTab film={film} />;
  }
}

function FilmPageTabs({film}: FilmPageTabsProps): JSX.Element {
  const params = useParams();
  return (
    getTabContent(film, params.tab as string)
  );
}

export default FilmPageTabs;
