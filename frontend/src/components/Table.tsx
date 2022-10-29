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

export default function TableComponent({ data }: TableReviewsProps) {
  const { classes, theme } = useStyles();

  const rows = data.map((row) => {
    // const totalReviews = row.reviews.negative + row.reviews.positive;
    // const positiveReviews = (row.reviews.positive / totalReviews) * 100;
    // const negativeReviews = (row.reviews.negative / totalReviews) * 100;

    return (
      <tr key={row.address}>
        <td>
          <Anchor<'a'> size="sm" onClick={(event) => event.preventDefault()}>
            {`${row.address.slice(0, 12)}...${row.address.slice(
              row.address.length - 4,
              row.address.length
            )}`}
          </Anchor>
        </td>
        <td>{row.type}</td>
        <td>{row.status}</td>
        <td>{row.description}</td>
        <td>{row.reportedBy}</td>
        <td>{new Date(row.reportedAt * 1000).toLocaleDateString()}</td>
        {row.option ? (
          <td>
            <Button>Approve</Button>
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
