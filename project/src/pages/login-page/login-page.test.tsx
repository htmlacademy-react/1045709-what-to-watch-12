import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { NameSpace, AuthorizationStatus } from '../../const';
import HistoryRouter from '../../hocs/history-route/history-route';
import LoginPage from './login-page';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const userNotAuthorizedState = {
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth},
};

describe('Component: LoginPage', () => {
  it('should render "LoginPage" when user navigate to "login" url', () => {
    history.push('/login');

    render(
      <Provider store={mockStore(userNotAuthorizedState)}>
        <HistoryRouter history={history}>
          <LoginPage />
        </HistoryRouter>
      </Provider>
    );

    const loginInput: HTMLInputElement = screen.getByPlaceholderText('Email address');
    const passwordInput: HTMLInputElement = screen.getByPlaceholderText('Password');
    const form = screen.getByTestId('login-form');

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    loginInput.value = 'keks';
    passwordInput.value = '123456';

    form.dispatchEvent(new Event('submit'));

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();

    expect(screen.getByRole('button')).toHaveAccessibleName(/Sign in/i);

  });


});
