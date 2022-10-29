import * as React from 'react';
import {
  createStyles,
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  ScrollArea,
  Button,
} from '@mantine/core';
import { ArweaveContext } from '../contexts/ArweaveContext';
import {
  IconCheck,
  IconCircleX,
  IconNumbers,
  IconSocial,
  IconWallet,
  IconWorldWww,
} from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `3px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

interface TableReviewsProps {
  data: {
    address: string;
    type: string;
    status: string;
    description: string;
    reportedBy: string;
    reportedAt: number;
    option: boolean;
  }[];
}

const typeIcons: Record<string, any> = {
  domain: <IconWorldWww />,
  'wallet address': <IconWallet />,
  wallet: <IconWallet />,
  'Wallet Address': <IconWallet />,
  IP: <IconNumbers />,
  'social media': <IconSocial />,
};
const statusIcons = {};

export default function TableComponent({ data }: TableReviewsProps) {
  const { classes, theme } = useStyles();
  const { owner, rejectFromBlacklist, approveToBlacklist } =
    React.useContext(ArweaveContext);

  const rows = data.map((row) => {
    // const totalReviews = row.reviews.negative + row.reviews.positive;
    // const positiveReviews = (row.reviews.positive / totalReviews) * 100;
    // const negativeReviews = (row.reviews.negative / totalReviews) * 100;

    return (
      <tr key={row.address}>
        <td>
          <Anchor<'a'>
            href={`https://viewblock.io/arweave/address/${row.address}`}
            size="sm"
            onClick={(event) => event.preventDefault()}
          >
            {`${row.address.slice(0, 12)}...${row.address.slice(
              row.address.length - 4,
              row.address.length
            )}`}
          </Anchor>
        </td>
        <td>
          <Group>
            {row.type} {typeIcons[row.type]}
          </Group>
        </td>
        <td>{row.status}</td>
        <td>
          <Text></Text>
          {row.description}
        </td>
        <td>
          {`${row.reportedBy.slice(0, 12)}...${row.reportedBy.slice(
            row.reportedBy.length - 4,
            row.reportedBy.length
          )}`}
        </td>
        <td>{new Date(row.reportedAt * 1000).toLocaleDateString()}</td>
        {owner && row.status === 'reported' ? (
          <td>
            <Button
              onClick={() => {
                approveToBlacklist(row.type, row.address);
              }}
              variant="outline"
            >
              <IconCheck />
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                rejectFromBlacklist(row.type, row.address);
              }}
            >
              <IconCircleX />
            </Button>
          </td>
        ) : (
          <></>
        )}
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
        <thead>
          <tr>
            <th>Address</th>
            <th>Type</th>
            <th>Status</th>
            <th>Description</th>
            <th>Created By</th>
            <th>Created At</th>
            {/* <th>Option</th> */}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
