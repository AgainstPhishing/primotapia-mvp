import {
  Title,
  Text,
  Container,
  Button,
  Overlay,
  createStyles,
} from '@mantine/core';
import jumbotrom from '../assets/jumbotrom.png';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingBottom: 60,
    backgroundImage: 'url(' + jumbotrom + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    '@media (max-width: 520px)': {
      paddingTop: 80,
      paddingBottom: 50,
    },
    height: 'auto',
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: 'center',

    '@media (max-width: 520px)': {
      fontSize: theme.fontSizes.md,
      textAlign: 'left',
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 1.5,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,

    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: 'rgba(255, 255, 255, .5)',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .45) !important',
    },
  },
}));

export function LandingPage() {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.75} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          <Text component="span" inherit className={classes.highlight}>
            <br />
            Decentralized Phishing Prevention
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            A tool to keep the web3 ecosystem safe and keeps growing onboarding
            more users with the same security level using blockchain
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            variant="white"
            size="lg"
            onClick={() => {
              window.open(
                'https://github.com/PrimoTapia/primotapia-mvp/tree/main/webextension',
                '_blank'
              );
            }}
          >
            Get Browser Extension
          </Button>
          <Button
            // className={cx(classes.control, classes.secondaryControl)}
            className={classes.control}
            variant="white"
            size="lg"
            onClick={() => {
              window.open('http://localhost:8000', '_blank');
            }}
          >
            Install Metamask Snap
          </Button>
        </div>
      </div>
    </div>
  );
}
