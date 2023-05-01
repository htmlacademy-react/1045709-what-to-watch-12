import useGetFilmInPage from '../../hooks/use-get-film-in-page';
import { useAppSelector } from '../../hooks';
import { getFilmDataLoadingStatus } from '../../store/films-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundPage from '../not-found-page/not-found-page';
import VideoPlayer from '../../components/video-player/video-player';

function VideoPlayerPage(): JSX.Element {
  const filmInVideo = useGetFilmInPage();
  const isFilmDataLoading = useAppSelector(getFilmDataLoadingStatus);

  if (isFilmDataLoading) {
    return <LoadingScreen />;
  }

  if (!filmInVideo) {
    return <NotFoundPage />;
  }

  return (
    <VideoPlayer film={filmInVideo} />
  );
}

export default VideoPlayerPage;

