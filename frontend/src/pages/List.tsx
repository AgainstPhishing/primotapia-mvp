import {
  Container,
  createStyles,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import * as React from 'react';
import TableComponent from '../components/Table';
import { ArweaveContext } from '../contexts/ArweaveContext';

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: 500,
    fontSize: 48,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: 34,
      lineHeight: 1.15,
    },
  },
}));

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
      <Container style={{ marginTop: '40px' }}>
        <Title
          order={2}
          size="h1"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
          weight={900}
          align="center"
        >
          Phishing Reports
        </Title>

        <br />
        <TextInput
          placeholder="Search by address"
          mb="md"
          icon={<IconSearch size={14} stroke={1.5} />}
          onChange={(e) => setSearch(e.target.value)}
        />
        <br />
        <TableComponent data={data} />
      </Container>
    </div>
  );
}
