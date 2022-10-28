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
              address: '0x9e9a2b7687B35bE7008A95b3b6173AA3fa9b4Ea9',
              type: 'wallet address',
              status: 'phishing',
              description: 'bla bla bla',
              reportedAt: new Date(),
              reportedBy: '0xC3499348beB5679DDF8EC6dB182f7141E2B66D57',
              option: false,
            },
            {
              address: '0x9e9a2b7687B35bE7008A95b3b6173AA3fa9b4Ea9',
              type: 'wallet address',
              status: 'phishing',
              description: 'bla bla bla',
              reportedAt: new Date(),
              reportedBy: '0xC3499348beB5679DDF8EC6dB182f7141E2B66D57',
              option: false,
            },
            {
              address: '0x9e9a2b7687B35bE7008A95b3b6173AA3fa9b4Ea9',
              type: 'wallet address',
              status: 'phishing',
              description: 'bla bla bla',
              reportedAt: new Date(),
              reportedBy: '0xC3499348beB5679DDF8EC6dB182f7141E2B66D57',
              option: false,
            },
            {
              address: '0x9e9a2b7687B35bE7008A95b3b6173AA3fa9b4Ea9',
              type: 'wallet address',
              status: 'phishing',
              description: 'bla bla bla',
              reportedAt: new Date(),
              reportedBy: '0xC3499348beB5679DDF8EC6dB182f7141E2B66D57',
              option: false,
            },
          ]}
        />
      </Container>
    </div>
  );
}
