import MainPage from '../../pages/main-page/main-page';
import { FilmCardProps } from '../../types/film-card-props';

function App(props: FilmCardProps): JSX.Element {
  return < MainPage title={props.title} genre={props.genre} year={props.year}/>;
}

export default App;
