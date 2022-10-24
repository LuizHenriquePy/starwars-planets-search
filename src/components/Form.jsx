import React, { useState, useContext } from 'react';
import { SWContext } from '../Context/starWarsProvider';

function Form() {
  const { textFilter, setTextFilter, addConfigData } = useContext(SWContext);
  const [formFilter, setFormFilter] = useState({
    columnName: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChangeFormFilter = ({ target }) => {
    setFormFilter({ ...formFilter, [target.name]: target.value });
  };

  return (
    <form>
      <input
        type="text"
        name="text"
        value={ textFilter }
        data-testid="name-filter"
        onChange={ ({ target }) => setTextFilter(target.value) }
      />
      <select
        value={ formFilter.column }
        name="columnName"
        onChange={ handleChangeFormFilter }
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        value={ formFilter.comparison }
        name="comparison"
        onChange={ handleChangeFormFilter }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        value={ formFilter.value }
        name="value"
        onChange={ handleChangeFormFilter }
        type="number"
        data-testid="value-filter"
      />
      <input
        type="button"
        value="Filter"
        data-testid="button-filter"
        onClick={ () => addConfigData(formFilter) }
      />
    </form>
  );
}

export default Form;
