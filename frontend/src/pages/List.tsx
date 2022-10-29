import { Container, Table, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import * as React from 'react';
import TableComponent from '../components/Table';
import { ArweaveContext } from '../contexts/ArweaveContext';

export default function List({}) {
  const { phishingList } = React.useContext(ArweaveContext);
  const [search, setSearch] = React.useState('');

  function compare(a: any, b: any) {
    if (a.last_nom < b.last_nom) {
      return -1;
    }
    if (a.last_nom > b.last_nom) {
      return 1;
    }
    return 0;
  }

  return (
    <div>
      <>
        <TextInput
          placeholder="Search by address"
          mb="md"
          icon={<IconSearch size={14} stroke={1.5} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableComponent data={phishingList} />
      </>
    </div>
  );
}
