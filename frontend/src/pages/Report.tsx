import * as React from 'react';
import {
  Button,
  Container,
  createStyles,
  Grid,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { ArweaveContext } from '../contexts/ArweaveContext';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 18,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

export default function Report() {
  // You can add these classes as classNames to any Mantine input, it will work the same
  const { classes } = useStyles();
  const { send } = React.useContext(ArweaveContext);
  const [address, setAddress] = React.useState('');
  const [type, setType] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState('');

  return (
    <div>
      <Container>
        <SimpleGrid>
          <Grid gutter={'md'}>
            <Grid.Col xs={10}>
              <TextInput
                label="Address"
                placeholder="0x000..."
                classNames={classes}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid.Col>
            <Grid.Col xs={2}>
              <Select
                style={{ zIndex: 2 }}
                data={[
                  { value: 'domain', label: 'Domain' },
                  { value: 'ip', label: 'IP Address' },
                  { value: 'profile', label: 'Social Media' },
                  { value: 'wallet', label: 'Wallet Address' },
                ]}
                defaultValue={'domain'}
                //   placeholder="phishing.com"
                label="Type"
                classNames={classes}
                onChange={setType}
              />
            </Grid.Col>
          </Grid>
        </SimpleGrid>

        <Textarea
          style={{ marginTop: 20 }}
          label="Description"
          placeholder="Why is it a phishing?"
          classNames={classes}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <Button
          fullWidth
          onClick={() => {
            send(address, type, description);
          }}
        >
          SEND
        </Button>
      </Container>
    </div>
  );
}
