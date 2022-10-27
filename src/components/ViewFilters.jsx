import React, { useContext } from 'react';
import { SWContext } from '../Context/starWarsProvider';

function ViewFilters() {
  const { configData, setConfigData, deleteConfigData } = useContext(SWContext);

  const removeAllFilter = () => setConfigData([]);

  return (
    <div>
      <button
        type="button"
        onClick={ removeAllFilter }
        data-testid="button-remove-filters"
      >
        Remover todas filtragens
      </button>
      {configData.map((el) => (
        <div key={ el.columnName } data-testid="filter">
          {`${el.columnName} | ${el.comparison} | ${el.value}`}
          <button type="button" onClick={ () => deleteConfigData(el) }>X</button>
        </div>))}
    </div>
  );
}

export default ViewFilters;
