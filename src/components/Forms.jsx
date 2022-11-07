/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line jsx-a11y/label-has-associated-control
import React, { useState, useContext, useEffect } from 'react';
import { SWContext } from '../Context/starWarsProvider';
import search from '../assets/search.png';

function Forms() {
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
    <div className="box">
      <form>
        <div className="divNameFilter">
          <input
            type="text"
            name="text"
            value={ textFilter }
            data-testid="name-filter"
            onChange={ ({ target }) => setTextFilter(target.value) }
            className="form-control"
          />
          <button type="button">
            <img src={ search } alt="" width="25px" />
          </button>
        </div>
      </form>
      <div className="box1">
        <form className="boxForm">
          <select
            name="columnsOrder"
            value={ order.column }
            id=""
            onChange={ handleSelectedFormOrder }
            data-testid="column-sort"
            className="form-select"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>

          <div className="form-check">
            <input
              type="radio"
              name="sort"
              value="ASC"
              id="ascendente"
              data-testid="column-sort-input-asc"
              onChange={ handleRadioClickFormOrder }
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor="ascendente">
              Ascendente
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sort"
              value="DESC"
              id="descendente"
              data-testid="column-sort-input-desc"
              onChange={ handleRadioClickFormOrder }
            />
            <label className="form-check-label" htmlFor="descendente">
              Descendente
            </label>
          </div>
          <input
            type="submit"
            value="ORDENAR"
            onClick={ handleClickFormOrder }
            data-testid="column-sort-button"
            className="btn btn-outline-warning"
          />
        </form>
        <form className="boxForm">
          <select
            value={ formFilter.column }
            name="columnName"
            onChange={ handleChangeFormFilter }
            data-testid="column-filter"
            id="columnSelectId"
            className="form-select"
          >
            {formColumnFilter
              .map((el) => <option key={ el } value={ el }>{ el }</option>)}
          </select>
          <select
            value={ formFilter.comparison }
            name="comparison"
            onChange={ handleChangeFormFilter }
            data-testid="comparison-filter"
            className="form-select"
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
            className="form-control form-input-value"
          />
          <input
            type="submit"
            value="FILTRAR"
            data-testid="button-filter"
            onClick={ handleClickFormFilter }
            className="btn btn-outline-warning"
          />
        </form>
      </div>
    </div>
  );
}

export default Forms;
