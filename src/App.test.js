import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from './pages/Login';
import userEvent from '@testing-library/user-event';
import App from './App';
import renderWithRouter from './renderWithRouter';

describe('Testando o footer', () => {
  it('Verifica se o footer está na página de comidas', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push('/comidas');
    const footer = getByTestId('footer');
    expect(footer).toBeInTheDocument();
  })
  it('Verifica se os links do footer funcionam', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push('/comidas');
    const drinkBtn = getByTestId('drinks-bottom-btn');
    expect(drinkBtn).toBeInTheDocument();
    fireEvent.click(drinkBtn)
    const drinkPathname = history.location.pathname;
    expect(drinkPathname).toBe('/bebidas');
    const footer = getByTestId('footer');
    expect(footer).toBeInTheDocument();
    const exploreBtn = getByTestId('explore-bottom-btn');
    expect(exploreBtn).toBeInTheDocument();
    fireEvent.click(exploreBtn)
    const explorePathname = history.location.pathname;
    expect(explorePathname).toBe('/explorar');
    const foodBtn = getByTestId('food-bottom-btn');
    expect(foodBtn).toBeInTheDocument();
    fireEvent.click(foodBtn)
    const foodPathname = history.location.pathname;
    expect(foodPathname).toBe('/comidas');
  })
})
/* test('Farewell, front-end', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
}); */

/* Sobre o getByPlaceholderText: https://testing-library.com/docs/queries/byplaceholdertext/ 
e toHaveValue: https://github.com/testing-library/jest-dom#tohavevalue
e toBeDisabled: https://github.com/testing-library/jest-dom#tobedisabled
*/

describe('Teste para verificar a tela de Login', () => {
  it('Verifica se existe um input de email', () => {
    const { getByPlaceholderText } = renderWithRouter(<Login />);
    const inputEmail = getByPlaceholderText(/email/i);
    expect(inputEmail).toBeInTheDocument();
  });

  it('Verifica se existe um input de senha', () => {
    const { getByPlaceholderText } = renderWithRouter(<Login />);
    const inputPassword = getByPlaceholderText(/senha/i);
    expect(inputPassword).toBeInTheDocument();
  });

  it('Verifica se existe um botão "Entrar"', () => {
    const { getByRole } = renderWithRouter(<Login />);
    const buttonLogin = getByRole('button', { name: /entrar/i });
    expect(buttonLogin).toBeInTheDocument();
  });

  it('Verifica se o botão permanece desativado com solicitação inválida', () => {
    const { getByPlaceholderText, getByRole } = renderWithRouter(<Login />);
    const inputEmail = getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, 'alguem');
    expect(inputEmail).toHaveValue('alguem');

    const inputPassword = getByPlaceholderText(/senha/i);
    userEvent.type(inputPassword, '123456');
    expect(inputPassword).toHaveValue('123456');

    const buttonLogin = getByRole('button', { name: /entrar/i });
    expect(buttonLogin).toBeDisabled();
  });

  it('Verifica se o botão é ativado após validação de email e password', () => {
    const { getByPlaceholderText, getByRole } = renderWithRouter(<Login />);
    const inputEmail = getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, 'alguem@email.com');
    expect(inputEmail).toHaveValue('alguem@email.com');

    const inputPassword = getByPlaceholderText(/senha/i);
    userEvent.type(inputPassword, '1234567');
    expect(inputPassword).toHaveValue('1234567');

    const buttonLogin = getByRole('button', { name: /entrar/i });
    expect(buttonLogin).not.toBeDisabled();
  });
});
