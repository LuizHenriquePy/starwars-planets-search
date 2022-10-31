import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Main from '../pages/Main';
import testData from '../../cypress/mocks/testData';

describe('Testa aplicação', () => {
  test('Teste se dados são renderizados na tela', async () => {
    global.fetch = () => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(testData),
    });
    render(<App />);

    await waitFor(() => {
      screen.getAllByRole('row').toHaveLegth(11);
    });

    expect(screen.findByText('Tatooine')).toBeInTheDocument();

    const input = screen.getByTestId("name-filter");
    const comparison = screen.getByTestId("comparison-filter");
    const buttonFilter = screen.getByTestId('button-filter');
    const value = screen.getByTestId("value-filter");
    
    userEvent.type(input, ' ');
    userEvent.type(input, 'o');

    userEvent.selectOptions(comparison, 'menor que');
    userEvent.clear(value);
    userEvent.type(value, '100')
    userEvent.click(buttonFilter);
    expect(screen.getByText('population | menor que | 100')).toBeInTheDocument();
    
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.clear(value);
    userEvent.type(value, '10')
    userEvent.click(buttonFilter);
    expect(screen.getByText('orbital_period | igual a | 10')).toBeInTheDocument();

    userEvent.selectOptions(comparison, 'maior que');
    userEvent.clear(value);
    userEvent.type(value, '1000')
    userEvent.click(buttonFilter);
    expect(screen.getByText('diameter | maior que | 1000')).toBeInTheDocument();

    expect(screen.getAllByTestId('filter').length).toBe(3);

    const buttons = screen.getAllByRole('button', { name: 'X' });
    userEvent.click(buttons[0]);

    expect(screen.getAllByTestId('filter').length).toBe(2);
    

  });
});
