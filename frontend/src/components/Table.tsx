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
  IconPlus,
  IconSocial,
  IconWallet,
  IconWorldWww,
  IconX,
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
  ip: <IconNumbers />,
  'social media': <IconSocial />,
  profile: <IconSocial />,
};

const statusIcons: Record<string, any> = {
  confirmed: <IconCheck color="green" />,
  rejected: <IconX color="red" />,
  reported: <IconPlus color="orange" />,
};

export default function TableComponent({ data }: TableReviewsProps) {
  const { classes, theme } = useStyles();
  const { owner, rejectFromBlacklist, approveToBlacklist } =
    React.useContext(ArweaveContext);

  const rows = data.map((row) => {
    // const totalReviews = row.reviews.negative + row.reviews.positive;
    // const positiveReviews = (row.reviews.positive / totalReviews) * 100;
    // const negativeReviews = (row.reviews.negative / totalReviews) * 100;

    return (
      <tr key={row.address + '-' + row.reportedAt}>
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
            <span title={row.type}>{typeIcons[row.type]}</span>
          </Group>
        </td>
        <td>
          <span title={row.status}>{statusIcons[row.status]}</span>
        </td>
        <td>{row.description}</td>
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
              <IconCheck color="green" />
            </Button>
            &nbsp;
            <Button
              variant="outline"
              onClick={() => {
                rejectFromBlacklist(row.type, row.address);
              }}
            >
              <IconCircleX color="red" />
            </Button>
          </td>
        ) : null}
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table
        sx={{ minWidth: 800 }}
        verticalSpacing="xs"
        style={{ border: '1px solid black', borderRadius: '15px' }}
      >
        <thead>
          <tr style={{ backgroundColor: '#5facff' }}>
            <th>Address</th>
            <th>Type</th>
            <th>Status</th>
            <th>Description</th>
            <th>Created By</th>
            <th>Created At</th>
            {owner ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
