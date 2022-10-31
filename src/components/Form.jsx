import React, { useState, useContext, useEffect } from 'react';
import { SWContext } from '../Context/starWarsProvider';

function Form() {
  const {
    textFilter,
    setTextFilter,
    addConfigData,
    configData,
    setOrderPlanet,
  } = useContext(SWContext);
  const [formColumnFilter, setFormColumnFilter] = useState([]);
  const [order, setOrder] = useState({ column: 'population', sort: '' });
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

  const handleClickFormFilter = (event) => {
    event.preventDefault();
    addConfigData(formFilter);
  };

  const handleRadioClickFormOrder = ({ target }) => {
    setOrder((prev) => ({ ...prev, sort: target.value }));
  };

  const handleClickFormOrder = (event) => {
    event.preventDefault();
    setOrderPlanet(order);
  };

  const handleSelectedFormOrder = ({ target }) => {
    setOrder((prev) => ({ ...prev, column: target.value }));
  };

  return (
    <div>
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
          type="submit"
          value="FILTRAR"
          data-testid="button-filter"
          onClick={ handleClickFormFilter }
        />
      </form>
      <form>
        <select
          name="columnsOrder"
          value={ order.column }
          id=""
          onChange={ handleSelectedFormOrder }
          data-testid="column-sort"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <label htmlFor="ascendente">
          <input
            type="radio"
            name="sort"
            value="ASC"
            id="ascendente"
            data-testid="column-sort-input-asc"
            onChange={ handleRadioClickFormOrder }

          />
          Ascendente
        </label>
        <label htmlFor="descendente">
          <input
            type="radio"
            name="sort"
            value="DESC"
            id="descendente"
            data-testid="column-sort-input-desc"
            onChange={ handleRadioClickFormOrder }
          />
          Descendente
        </label>
        <input
          type="submit"
          value="ORDENAR"
          onClick={ handleClickFormOrder }
          data-testid="column-sort-button"
        />
      </form>
    </div>
  );
}

export default Form;
