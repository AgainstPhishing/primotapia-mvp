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
              />
            </Grid.Col>
            <Grid.Col xs={2}>
              <Select
                style={{ zIndex: 2 }}
                data={['Domain', 'Social Media', 'IP', 'Wallet Address']}
                defaultValue={'Domain'}
                //   placeholder="phishing.com"
                label="Type"
                classNames={classes}
              />
            </Grid.Col>
          </Grid>
        </SimpleGrid>

        <Textarea
          style={{ marginTop: 20 }}
          label="Description"
          placeholder="Why is it a phishing?"
          classNames={classes}
        />
        <br />
        <Button fullWidth>SEND</Button>
      </Container>
    </div>
  );
}
