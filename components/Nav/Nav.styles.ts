import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  anchor: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'none',
    },
    [theme.fn.smallerThan('md')]: {
      // fontSize: 50,
    },
  },
}));
