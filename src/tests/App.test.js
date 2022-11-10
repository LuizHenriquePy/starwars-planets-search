import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import testData from './mocks/testData';

describe('Testa aplicação Star Wars Planets', () => {
  beforeAll(() => {
    global.fetch =  () => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(testData),
    });
  });
  test('Testa se elementos estão na tela', async () => {
    render(<App />);
    const nameFilter = screen.getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();
    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();
    const comparison = screen.getByTestId('comparison-filter');
    expect(comparison).toBeInTheDocument();
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    const columnSort = screen.getByTestId('column-sort');
    expect(columnSort).toBeInTheDocument();
    const columnSortInputAsc = screen.getByTestId('column-sort-input-asc');
    expect(columnSortInputAsc).toBeInTheDocument();
    const columnSortInputDesc = screen.getByTestId('column-sort-input-desc');
    expect(columnSortInputDesc);
    const columnSortButton = screen.getByTestId('column-sort-button');
    expect(columnSortButton).toBeInTheDocument();
    const buttonRemoveFilters = screen.getByTestId('button-remove-filters');
    expect(buttonRemoveFilters).toBeInTheDocument();
    await waitFor(() => expect(screen.getAllByRole('row').length).toBe(11));
  });
  test('Testa filtro por texto', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getAllByRole('row').length).toBe(11));
    const nameFilter = screen.getByTestId('name-filter');
    
    userEvent.type(nameFilter, 'o');
    expect(screen.getAllByRole('row').length).toBe(8);
    
    userEvent.clear(nameFilter);
    userEvent.type(nameFilter, 'oo');
    expect(screen.getAllByRole('row').length).toBe(3);
  });
  test('testa filtros', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getAllByRole('row').length).toBe(11));
    const columnFilter = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    const buttonRemoveFilters = screen.getByTestId('button-remove-filters');
    
    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, "20");
    userEvent.click(buttonFilter);
    expect(screen.getAllByRole('row').length).toBe(9);
    expect(screen.getAllByTestId('filter').length).toBe(1);

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, "1000000001");
    userEvent.click(buttonFilter);
    expect(screen.getAllByRole('row').length).toBe(4);
    expect(screen.getAllByTestId('filter').length).toBe(2);

    userEvent.click(screen.getAllByTestId('button-filter-delete')[0])
    expect(screen.getAllByRole('row').length).toBe(6);
    expect(screen.getAllByTestId('filter').length).toBe(1);

    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, "27");
    userEvent.click(buttonFilter);
    expect(screen.getAllByRole('row').length).toBe(2);
    expect(screen.getAllByTestId('filter').length).toBe(2);

    userEvent.click(buttonRemoveFilters);
  });
  test('Testa ordenação Ascendente', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getAllByRole('row').length).toBe(11));
    const columnSortInputAsc = screen.getByTestId('column-sort-input-asc');
    const columnSortButton = screen.getByTestId('column-sort-button');
    const columnSort = screen.getByTestId('column-sort');
    
    userEvent.selectOptions(columnSort, 'population');
    userEvent.click(columnSortInputAsc);
    userEvent.click(columnSortButton);
    let rows = screen.getAllByRole('row');
    expect(rows[1]).toEqual(screen.getByRole('row', { name: /yavin iv/i }));
    expect(rows[rows.length - 3]).toEqual(screen.getByRole('row', { name: /coruscant/i }));
  });
  test('Testa ordenação Descendente', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getAllByRole('row').length).toBe(11));
    const columnSortInputDesc = screen.getByTestId('column-sort-input-desc');
    const columnSortButton = screen.getByTestId('column-sort-button');

    const columnSort = screen.getByTestId('column-sort');
    userEvent.selectOptions(columnSort, 'population');
    userEvent.click(columnSortInputDesc);
    userEvent.click(columnSortButton);
    let rows = screen.getAllByRole('row');
    expect(rows[1]).toEqual(screen.getByRole('row', { name: /coruscant/i }));
    expect(rows[rows.length - 3]).toEqual(screen.getByRole('row', { name: /Yavin IV/i }));
  });
});
