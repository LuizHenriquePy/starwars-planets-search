import React, { useContext, useState, useEffect } from 'react';
import { SWContext } from '../Context/starWarsProvider';

function Table() {
  const { planetList } = useContext(SWContext);
  const [input, setInput] = useState('');
  const [tableRows, setTableRows] = useState();

  useEffect(() => {
    if (input) {
      setTableRows(planetList
        .filter((el) => el.name.toLowerCase().includes(input.toLowerCase())));
    } else {
      setTableRows(planetList);
    }
  }, [input, planetList]);

  return (
    <div>
      <form>
        <input
          type="text"
          value={ input }
          data-testid="name-filter"
          onChange={ ({ target }) => setInput(target.value) }
        />
      </form>
      <table>
        <thead>
          <tr>
            {planetList
            && Object.keys(planetList[0]).map((el) => <th key={ el }>{ el }</th>)}
          </tr>
        </thead>
        <tbody>
          {tableRows && tableRows.map((el) => (
            <tr key={ el.name }>
              <td>{el.name}</td>
              <td>{el.rotation_period}</td>
              <td>{el.orbital_period}</td>
              <td>{el.diameter}</td>
              <td>{el.climate}</td>
              <td>{el.gravity}</td>
              <td>{el.terrain}</td>
              <td>{el.surface_water}</td>
              <td>{el.population}</td>
              <td>{el.films}</td>
              <td>{el.created}</td>
              <td>{el.edited}</td>
              <td>{el.url}</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
