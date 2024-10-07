
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavButton from './NavButton';
import '@testing-library/jest-dom/extend-expect';

describe('NavButton Component', () => {
  test('renders as an anchor tag when href is provided', () => {
    render(<NavButton label="Home" href="/home" />);
    const linkElement = screen.getByText('Home');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveAttribute('href', '/home');
  });

  test('renders as a button when href is not provided', () => {
    render(<NavButton label="Login" onClick={() => {}} />);
    const buttonElement = screen.getByText('Login');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe('BUTTON');
  });

  test('applies correct class names based on variant prop', () => {
    const { rerender } = render(<NavButton label="Login" variant="login" />);
    let buttonElement = screen.getByText('Login');

    expect(buttonElement).toHaveClass('nav-button', 'nav-button--login');

    rerender(<NavButton label="Logout" variant="logout" />);
    buttonElement = screen.getByText('Logout');
    expect(buttonElement).toHaveClass('nav-button', 'nav-button--logout');

    rerender(<NavButton label="Home" />);
    buttonElement = screen.getByText('Home');
    expect(buttonElement).toHaveClass('nav-button');
    expect(buttonElement).not.toHaveClass('nav-button--login', 'nav-button--logout');
  });

  test('renders the correct label text', () => {
    render(<NavButton label="Donate" />);
    const buttonElement = screen.getByText('Donate');

    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick handler when clicked (button)', () => {
    const handleClick = jest.fn();
    render(<NavButton label="Click Me" onClick={handleClick} />);
    const buttonElement = screen.getByText('Click Me');

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick handler when rendered as a link', () => {
    const handleClick = jest.fn();
    render(<NavButton label="Home" href="/home" onClick={handleClick} />);
    const linkElement = screen.getByText('Home');

    fireEvent.click(linkElement);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
