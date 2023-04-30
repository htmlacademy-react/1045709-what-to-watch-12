import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { NameSpace, AuthorizationStatus } from '../../const';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../hocs/history-route/history-route';
import LoginPage from './login-page';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const userNotAuthorizedState = {
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth},
};

describe('Component: LoginPage', () => {
  it('should render "LoginPage" when user navigate to "login" url', async () => {
    history.push('/login');

    render(
      <Provider store={mockStore(userNotAuthorizedState)}>
        <HistoryRouter history={history}>
          <LoginPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('login'), 'keks');
    await userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();

    expect(screen.getByRole('button'))
      .toHaveAccessibleName(/Sign in/i);
  });


});
