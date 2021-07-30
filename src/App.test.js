import React from 'react';
import { fireEvent } from '@testing-library/react';
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
