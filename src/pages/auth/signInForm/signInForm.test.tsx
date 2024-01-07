import { SignIn } from './signInForm';
import { renderWithProviders } from '@test/renderWithProviders';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('sign in form', async () => {
  it('render form', async () => {
    renderWithProviders(<SignIn />);

    await waitFor(() => {
      const signInElement = screen.getByTestId('sign-in-form');
      expect(signInElement).toBeInTheDocument();
    });
  });

  it('displays error message for required fields', async () => {
    renderWithProviders(<SignIn />);

    await waitFor(() => {
      const signInButton = screen.getByTestId('sign-in-button');

      fireEvent.click(signInButton);

      const emailField = screen.getByTestId('email');
      const emailError = emailField.querySelector('[data-testid="error-message"]');

      expect(emailError).toBeInTheDocument();
      expect(emailError).toHaveTextContent('Please enter your email address');

      const passwordField = screen.getByTestId('password');
      const passwordError = passwordField.querySelector('[data-testid="error-message"]');

      expect(passwordError).toBeInTheDocument();
      expect(passwordError).toHaveTextContent('Please enter your password');
    });
  });

  it('display error message for invalid email', async () => {
    renderWithProviders(<SignIn />);

    await waitFor(() => {
      const signInButton = screen.getByTestId('sign-in-button');
      const emailInput = screen.getByPlaceholderText('Email');

      fireEvent.change(emailInput, { target: { value: 'email' } });
      fireEvent.click(signInButton);

      const emailField = screen.getByTestId('email');
      const emailError = emailField.querySelector('[data-testid="error-message"]');

      expect(emailError).toBeInTheDocument();
      expect(emailError).toHaveTextContent('Type valid email');
    });
  });

  it('display error message for invalid password', async () => {
    renderWithProviders(<SignIn />);

    await waitFor(() => {
      const signInButton = screen.getByTestId('sign-in-button');
      const passwordInput = screen.getByPlaceholderText('Password');

      fireEvent.change(passwordInput, { target: { value: 'inValidPassword!' } });
      fireEvent.click(signInButton);

      const passwordField = screen.getByTestId('password');
      const passwordError = passwordField.querySelector('[data-testid="error-message"]');

      expect(passwordError).toBeInTheDocument();
      expect(passwordError).toHaveTextContent('Your password must have at least 1 digit character');
    });
  });

  it('does not display error message for valid fields', async () => {
    renderWithProviders(<SignIn />);

    await waitFor(() => {
      const signInButton = screen.getByTestId('sign-in-button');
      const passwordInput = screen.getByPlaceholderText('Password');
      const emailInput = screen.getByPlaceholderText('Email');

      fireEvent.change(passwordInput, { target: { value: 'ValidPassword1!' } });
      fireEvent.click(signInButton);

      const passwordField = screen.getByTestId('password');
      const passwordError = passwordField.querySelector('[data-testid="error-message"]');

      expect(passwordError).not.toBeInTheDocument();

      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.click(signInButton);

      const emailField = screen.getByTestId('email');
      const emailError = emailField.querySelector('[data-testid="error-message"]');

      expect(emailError).not.toBeInTheDocument();
    });
  });
});
