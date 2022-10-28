import { Container, Table } from '@mantine/core';
import * as React from 'react';
import TableComponent from '../components/Table';

export default function List({}) {
  return (
    <div>
      <Container>
        <TableComponent
          data={[
            {
              title: 'Foundation',
              author: 'Isaac Asimov',
              year: 1951,
              reviews: {
                positive: 2223,
                negative: 259,
              },
            },
            {
              title: 'Frankenstein',
              author: 'Mary Shelley',
              year: 1818,
              reviews: {
                positive: 5677,
                negative: 1265,
              },
            },
          ]}
        />
      </Container>
    </div>
  );
}
