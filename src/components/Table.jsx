import React, { useContext } from 'react';
import { SWContext } from '../Context/starWarsProvider';

function Table() {
  const { planetList } = useContext(SWContext);
  return (
    <table>
      <thead>
        <tr>
          {planetList
          && Object.keys(planetList[0]).map((el) => <th key={ el }>{ el }</th>)}
        </tr>
      </thead>
      <tbody>
        {planetList && planetList.map((el) => (
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
  );
}

export default Table;
