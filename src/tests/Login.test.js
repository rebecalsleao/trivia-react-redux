import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';


export const VALID_EMAIL = 'alguem@email.com';
const INVALID_EMAIL = ' ';
const TEST_ID_EMAIL = 'input-gravatar-email';

export const VALID_NAME = 'input-player-name';

describe('Verifica se a página inicial de Login possui os seguintes campos e características', () => {

test('teste Login, botão válido', () => {
    renderWithRouterAndRedux(<Login />);

    const btnValid = screen.getByRole('button', { name: /Play/i });
    const validName = screen.getByTestId(VALID_NAME);
    const emailInput = screen.getByTestId(TEST_ID_EMAIL);

    expect(btnValid).toBeInTheDocument();
    expect(btnValid).toBeDisabled();
    
    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(validName, VALID_NAME);
    userEvent.click(btnValid);
    expect(btnValid).not.toBeDisabled();
  });
});