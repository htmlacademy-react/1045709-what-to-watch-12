import { useRef, useState, FormEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';

const EMAIL_ERROR_MESSAGE = 'Email must be a valid email';
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_ERROR_MESSAGE = 'Password must contain at least one letter and one number';
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*\d)/i;

function LoginForm(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!passwordRef.current || !loginRef.current) {
      return;
    }

    if (!EMAIL_PATTERN.test(loginRef.current.value)) {
      setErrorMessage(EMAIL_ERROR_MESSAGE);
      return;
    }

    if (!PASSWORD_PATTERN.test(passwordRef.current.value)) {
      setErrorMessage(PASSWORD_ERROR_MESSAGE);
      return;
    }

    onSubmit({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    });

  };

  return (
    <form
      action="#"
      className="sign-in__form"
      onSubmit={handleSubmit}
    >
      {errorMessage ?
        <div className='sign-in__message'>
          <p>{errorMessage}</p>
        </div>
        :
        null}
      <div className="sign-in__fields">
        <div className="sign-in__field">
          <input
            ref={loginRef}
            className="sign-in__input"
            type="email" placeholder="Email address"
            name="user-email"
            id="user-email"
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
        </div>
        <div className="sign-in__field">
          <input
            ref={passwordRef}
            className="sign-in__input" type="password"
            placeholder="Password" name="user-password"
            id="user-password"
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
        </div>
      </div>
      <div className="sign-in__submit">
        <button
          className="sign-in__btn"
          type="submit"
        >
              Sign in
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
