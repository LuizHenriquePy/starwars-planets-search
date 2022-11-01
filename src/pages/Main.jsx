import React from 'react';
import Table from '../components/Table';
import Forms from '../components/Forms';
import ViewFilters from '../components/ViewFilters';

function Main() {
  return (
    <main>
      <Forms />
      <ViewFilters />
      <Table />
    </main>
  );
}

export default Main;
