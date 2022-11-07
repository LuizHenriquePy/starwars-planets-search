import React from 'react';
import Table from '../components/Table';
import Forms from '../components/Forms';
import ViewFilters from '../components/ViewFilters';

function Main() {
  return (
    <div className="main">
      <header className="display-1 header">STAR WARS PLANETS</header>
      <Forms />
      <ViewFilters />
      <Table />
      <a href="https://www.flaticon.com/free-icons/search" title="search icons">Search icons created by Freepik - Flaticon</a>
    </div>
  );
}

export default Main;
