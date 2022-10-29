import { Container, Table, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import * as React from 'react';
import TableComponent from '../components/Table';
import { ArweaveContext } from '../contexts/ArweaveContext';

export default function List({}) {
  const { phishingList, owner } = React.useContext(ArweaveContext);
  const [search, setSearch] = React.useState('');

  function compare(a: any, b: any) {
    if (a.reportedAt < b.reportedAt) {
      return 1;
    }
    if (a.reportedAt > b.reportedAt) {
      return -1;
    }
    return 0;
  }

  const data = phishingList
    .filter((item: any) =>
      item.address?.toLowerCase().includes(search.toLowerCase())
    )
    .sort(compare);

  return (
    <div>
      <>
        <TextInput
          placeholder="Search by address"
          mb="md"
          icon={<IconSearch size={14} stroke={1.5} />}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableComponent data={data} />
      </>
    </div>
  );
}
