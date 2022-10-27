import React, { useState, useContext, useEffect } from 'react';
import { SWContext } from '../Context/starWarsProvider';

function Form() {
  const {
    textFilter,
    setTextFilter,
    addConfigData,
    configData,
  } = useContext(SWContext);
  const [formColumnFilter, setFormColumnFilter] = useState([]);
  const [formFilter, setFormFilter] = useState({
    columnName: formColumnFilter[0],
    comparison: 'maior que',
    value: 0,
  });

  useEffect(() => {
    const listColumnNames = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const listColumnSelect = configData.map((el) => el.columnName);
    const a = listColumnNames.filter((el) => !(listColumnSelect.includes(el)));
    setFormColumnFilter(a);
    setFormFilter((prev) => ({ ...prev, columnName: a[0] }));
    const columnSelect = document.querySelector('#columnSelectId');
    const [colName] = a;
    columnSelect.value = colName;
  }, [configData]);

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
        id="columnSelectId"
      >
        {formColumnFilter.map((el) => <option key={ el } value={ el }>{ el }</option>)}
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
