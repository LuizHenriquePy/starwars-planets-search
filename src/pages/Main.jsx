import React from 'react';
import Table from '../components/Table';
import Form from '../components/Form';
import ViewFilters from '../components/ViewFilters';

function Main() {
  return (
    <main>
      <Form />
      <ViewFilters />
      <Table />
    </main>
  );
}

export default Main;
