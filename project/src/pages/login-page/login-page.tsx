import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus, AppRoute } from '../../const';
import Logo from '../../components/logo/logo';
import LoginForm from '../../components/login-form/login-form';
import Footer from '../../components/footer/footer';

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <Navigate to={AppRoute.Root} />
    );
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        < Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <LoginForm />
      </div>

      < Footer />
    </div>
  );
}

export default LoginPage;
