import { Container, Table } from '@mantine/core';
import * as React from 'react';
import TableComponent from '../components/Table';
import { ArweaveContext } from '../contexts/ArweaveContext';

export default function List({}) {
  const { phishingList } = React.useContext(ArweaveContext);

  return (
    <div>
      <Container>
        <TableComponent data={phishingList} />
      </Container>
    </div>
  );
}
