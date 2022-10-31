import React, { useContext } from 'react';
import { SWContext } from '../Context/starWarsProvider';

function Table() {
  const { selectedListPlanets, planetsList, orderPlanet } = useContext(SWContext);

  let list = selectedListPlanets;
  if (orderPlanet.column && orderPlanet.sort) {
    if (orderPlanet.sort === 'ASC') {
      list = list.sort((arg1, arg2) => {
        if (arg1[orderPlanet.column] === 'unknown') {
          return 1;
        }
        if (arg2[orderPlanet.column] === 'unknown') {
          return 1 - 2;
        }
        return Number(arg1[orderPlanet.column])
        - Number(arg2[orderPlanet.column]);
      });
    } else if (orderPlanet.sort === 'DESC') {
      list = list.sort((arg1, arg2) => {
        if (arg1[orderPlanet.column] === 'unknown') {
          return 1;
        }
        if (arg2[orderPlanet.column] === 'unknown') {
          return 1 - 2;
        }
        return Number(arg2[orderPlanet.column])
        - Number(arg1[orderPlanet.column]);
      });
    }
  }

  return (
    <table>
      <thead>
        <tr>
          {planetsList
          && Object.keys(planetsList[0]).map((el) => <th key={ el }>{ el }</th>)}
        </tr>
      </thead>
      <tbody>
        {list.map((el) => (
          <tr key={ el.name }>
            <td data-testid="planet-name">{el.name}</td>
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
