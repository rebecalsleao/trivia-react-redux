import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import App from '../App';


export const VALID_EMAIL = 'alguem@email.com';
export const INVALID_EMAIL_0 = 'email';
export const INVALID_EMAIL_1 = 'email@com@';
export const INVALID_EMAIL_2 = 'emailcom@';
export const INVALID_EMAIL_3 = 'alguem@email.';
export const INVALID_EMAIL_4 = '';
export const TEST_ID_EMAIL = 'input-gravatar-email';
export const VALID_NAME = 'input-player-name';


describe('1. Verifica se a página inicial de Login possui os seguintes campos e características', () => {
  test('Teste da pages Login', () => {
    renderWithRouterAndRedux(<Login />);

    const btnValid = screen.getByRole('button', { name: /Play/i });
    const validName = screen.getByTestId(VALID_NAME);
    const emailInput = screen.getByTestId(TEST_ID_EMAIL);

    expect(btnValid).toBeInTheDocument();
    expect(btnValid).toBeDisabled();
    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(validName, VALID_NAME);
    userEvent.click(btnValid);
  });
});

describe('2.Verifica teste de cobertura da page Login', () => {
    test('Verifica se a página possui input com o data-testid "input-player-name"', () => {
      renderWithRouterAndRedux(<App />);

      const inputName = screen.getByTestId('input-player-name');
      expect(inputName).toBeInTheDocument();
    });
  });

describe('3.Verifica se o campo e-mail é válido', () => {
  test('Teste o campo e-mail', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId(TEST_ID_EMAIL);

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveTextContent('');
  });
});
describe('4.Verifica teste de cobertura da page Login', () => {
  test('Verifica se a página possui input com o data-testid "input-gravatar-email"', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();
  });
});
describe('5.Verifica teste de cobertura da page Login', () => {
  test('Verifica se a página possui um button com o data-testid "btn-play" e data-testid "btn-settings"', () => {
    renderWithRouterAndRedux(<App />);

    const buttonPlay = screen.getByTestId('btn-play');
    expect(buttonPlay).toBeInTheDocument();
    const buttonSettings = screen.getByTestId('btn-settings');
    expect(buttonSettings).toBeInTheDocument();
  });
});
describe('6.Verifica campo botão', () => {
    test('Ao preencher os campos nome e email, o botão é habilitado, ', () => {
      renderWithRouterAndRedux(<App />);

      const inputEmail = screen.getByTestId('input-gravatar-email');
      const inputName = screen.getByTestId('input-player-name');
      const buttonPlay = screen.getByTestId('btn-play');
      
      expect(buttonPlay).toBeDisabled('disable');
      userEvent.type(inputEmail,VALID_EMAIL );
      userEvent.type(inputName, 'group6test');
      expect(buttonPlay).not.toHaveAttribute('disable');
    });
  });