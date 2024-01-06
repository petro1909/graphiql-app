import { SignUp } from './signUpForm';
import { renderWithProviders } from '@test/renderWithProviders';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

describe('sign in form rendered', () => {
  it('render form', async () => {
    renderWithProviders(<SignUp />);

    await waitFor(() => {
      const signInElement = screen.getByTestId('sign-up-form');
      expect(signInElement).toBeInTheDocument();
    });
  });

  it('displays error message for required field', async () => {
    renderWithProviders(<SignUp />);

    await waitFor(() => {
      const signUpButton = screen.getByTestId('sign-up-button');

      fireEvent.click(signUpButton);

      const usernameField = screen.getByTestId('name');
      const usernameError = usernameField.querySelector('[data-testid="error-message"]');

      expect(usernameError).toBeInTheDocument();
      expect(usernameError).toHaveTextContent('Your name must start with an uppercase letter');

      const emailField = screen.getByTestId('email');
      const emailError = emailField.querySelector('[data-testid="error-message"]');

      expect(emailError).toBeInTheDocument();
      expect(emailError).toHaveTextContent('Please enter your email address');

      const passwordField = screen.getByTestId('password');
      const passwordError = passwordField.querySelector('[data-testid="error-message"]');

      expect(passwordError).toBeInTheDocument();
      expect(passwordError).toHaveTextContent('Please enter your password');

      const confirmPasswordField = screen.getByTestId('confirmPassword');
      const confirmPasswordError = confirmPasswordField.querySelector('[data-testid="error-message"]');

      expect(confirmPasswordError).toBeInTheDocument();
      expect(confirmPasswordError).toHaveTextContent('Confirm Password is required');
    });
  });

  it(' display error message for invalid name', async () => {
    renderWithProviders(<SignUp />);

    await waitFor(() => {
      const signUpButton = screen.getByTestId('sign-up-button');
      const nameInput = screen.getByPlaceholderText('Name');

      fireEvent.change(nameInput, { target: { value: 'invalid name' } });
      fireEvent.click(signUpButton);

      const nameField = screen.getByTestId('name');
      const nameError = nameField.querySelector('[data-testid="error-message"]');

      expect(nameError).toBeInTheDocument();
      expect(nameError).toHaveTextContent('Your name must start with an uppercase letter');
    });
  });

  it('does not display error message for valid password', async () => {
    renderWithProviders(<SignUp />);

    await waitFor(() => {
      const signUpButton = screen.getByTestId('sign-up-button');
      const passwordInput = screen.getByPlaceholderText('Password');

      fireEvent.change(passwordInput, { target: { value: 'ValidPassword1!' } });
      fireEvent.click(signUpButton);

      const passwordField = screen.getByTestId('password');
      const passwordError = passwordField.querySelector('[data-testid="error-message"]');

      expect(passwordError).not.toBeInTheDocument();
    });
  });

  it('displays error message for required field', async () => {
    renderWithProviders(<SignUp />);

    await waitFor(() => {
      const signUpButton = screen.getByTestId('sign-up-button');

      const nameInput = screen.getByPlaceholderText('Name');
      fireEvent.change(nameInput, { target: { value: 'Valid Name' } });

      const emailInput = screen.getByPlaceholderText('Email');
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

      const passwordInput = screen.getByPlaceholderText('Password');
      fireEvent.change(passwordInput, { target: { value: 'ValidPassword1!' } });

      const confirmPasswordInput = screen.getByPlaceholderText('Repeat password');
      fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPassword1!' } });

      fireEvent.click(signUpButton);

      const usernameField = screen.getByTestId('name');
      const usernameError = usernameField.querySelector('[data-testid="error-message"]');
      expect(usernameError).not.toBeInTheDocument();

      const emailField = screen.getByTestId('email');
      const emailError = emailField.querySelector('[data-testid="error-message"]');
      expect(emailError).not.toBeInTheDocument();

      const passwordField = screen.getByTestId('password');
      const passwordError = passwordField.querySelector('[data-testid="error-message"]');
      expect(passwordError).not.toBeInTheDocument();

      const confirmPasswordField = screen.getByTestId('confirmPassword');
      const confirmPasswordError = confirmPasswordField.querySelector('[data-testid="error-message"]');
      expect(confirmPasswordError).not.toBeInTheDocument();
    });
  });
});
