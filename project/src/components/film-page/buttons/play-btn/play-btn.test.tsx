import { render, screen, fireEvent } from '@testing-library/react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import PlayBtn from './play-btn';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('PlayBtn', () => {
  const filmId = 12;

  it('should render correctly', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.MockedFunction<() => NavigateFunction>).mockReturnValue(navigateMock);

    render(<PlayBtn filmId={filmId} />);
    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  it('should navigate to the video player on click', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.MockedFunction<() => NavigateFunction>).mockReturnValue(navigateMock);

    render(<PlayBtn filmId={filmId} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith(`${AppRoute.VideoPlayer}/${filmId}`);
  });
});
