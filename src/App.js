import React from 'react';
import Main from './pages/Main';
import Provider from './Context/starWarsProvider';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

function App() {
  return (
    <Provider>
      <Main />
    </Provider>
  );
}

export default App;
