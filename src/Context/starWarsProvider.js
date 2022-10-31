import React, { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const SWContext = createContext();

function Provider({ children }) {
  const [planetsList, setPlanetsList] = useState();
  const [selectedListPlanets, setSelectListPlanets] = useState([]);
  const [configData, setConfigData] = useState([]);
  const [textFilter, setTextFilter] = useState('');
  const [orderPlanet, setOrderPlanet] = useState({ column: '', sort: '' });

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const results = data.results.map((el) => {
        delete el.residents;
        return el;
      });
      setPlanetsList(results);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    if (planetsList) {
      let list = planetsList
        .filter((el) => {
          if (textFilter.trim() !== '') {
            return el.name.toLowerCase().includes(textFilter.toLowerCase());
          }
          return true;
        });

      configData.forEach((config) => {
        if (config.comparison === 'maior que') {
          list = list
            .filter((el) => Number(el[config.columnName]) > Number(config.value));
        } else if (config.comparison === 'menor que') {
          list = list
            .filter((el) => Number(el[config.columnName]) < Number(config.value));
        } else if (config.comparison === 'igual a') {
          list = list
            .filter((el) => Number(el[config.columnName]) === Number(config.value));
        }
      });
      setSelectListPlanets(list);
    }
  }, [planetsList, configData, textFilter]);

  const contextValue = useMemo(() => {
    const deleteConfigData = ({ columnName }) => {
      setConfigData((prev) => [...prev.filter((e) => e.columnName !== columnName)]);
    };
    const addConfigData = (newConfigData) => {
      setConfigData((prev) => [...prev, newConfigData]);
    };
    return ({
      planetsList,
      configData,
      deleteConfigData,
      addConfigData,
      textFilter,
      setTextFilter,
      selectedListPlanets,
      setConfigData,
      setOrderPlanet,
      orderPlanet,
    });
  }, [planetsList, configData, textFilter, selectedListPlanets, orderPlanet]);

  return (
    <SWContext.Provider value={ contextValue }>
      { children }
    </SWContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
