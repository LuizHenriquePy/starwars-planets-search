import React from 'react';
import Main from './pages/Main';
import Provider from './Context/starWarsProvider';
import './App.css';

function App() {
  return (
    <Provider>
      <Main />
    </Provider>
  );
}

export default App;
