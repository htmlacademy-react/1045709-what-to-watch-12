import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { logoutAction } from '../../store/api-actions';
import { AuthorizationStatus, AppRoute } from '../../const';

function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const onClick = () => {
    dispatch(logoutAction());
  };

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ?
      <ul className="user-block">
        <li className="user-block__item">
          <Link to={AppRoute.MyList}>
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </Link>
        </li>
        <li className="user-block__item">
          <Link onClick={onClick} to={AppRoute.Login} className="user-block__link">Sign out</Link>
        </li>
      </ul>
      :
      <div className="user-block">
        <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
      </div>

  );
}

export default UserBlock;
