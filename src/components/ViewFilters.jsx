import React, { useContext } from 'react';
import { SWContext } from '../Context/starWarsProvider';
import trash from '../assets/trash.png';

function ViewFilters() {
  const { configData, setConfigData, deleteConfigData } = useContext(SWContext);

  const removeAllFilter = () => setConfigData([]);

  return (
    <div className="view-filters">
      <button
        type="button"
        onClick={ removeAllFilter }
        data-testid="button-remove-filters"
        className="btn btn-outline-danger button-remove-all-filters"
      >
        Remover todas filtragens
      </button>
      <div className="filters">
        {configData.map((el) => (
          <div key={ el.columnName } data-testid="filter" className="divFilter">
            {`${el.columnName} | ${el.comparison} | ${el.value}`}
            <button
              type="button"
              onClick={ () => deleteConfigData(el) }
              className="buttonFilter"
              data-testid="button-filter-delete"
            >
              <img
                src={ trash }
                alt=""
              />
            </button>
          </div>))}
      </div>
    </div>
  );
}

export default ViewFilters;
