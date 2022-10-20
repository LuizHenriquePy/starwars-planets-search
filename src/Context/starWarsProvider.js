import React, { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const SWContext = createContext();

function Provider({ children }) {
  const [planetList, setPlanetList] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const results = data.results.map((el) => {
        delete el.residents;
        return el;
      });
      setPlanetList({ planetList: results });
    };
    fetchAPI();
  }, []);

  const contextValue = useMemo(() => ({ ...planetList }), [planetList]);
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
