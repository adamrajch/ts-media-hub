import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Container,
  Drawer,
  Group,
  Stack,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useMediaQuery, useWindowScroll } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import useStyles from './Nav.styles';

const NAV_BAR_HEIGHT = 50;
export default function Nav() {
  const [opened, setOpened] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isTop, setIsTop] = useState(true);

  const { classes } = useStyles();
  const [scroll] = useWindowScroll();
  const { colorScheme } = useMantineColorScheme();

  const lgScreen = useMediaQuery('(min-width: 900px)');

  const handleScroll = () => {
    const currentScrollPos = scroll.y;
    if (scroll.y > 100) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }

    setVisible(currentScrollPos < NAV_BAR_HEIGHT || prevScrollPos > currentScrollPos);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible, prevScrollPos, handleScroll]);
  const lightBg = colorScheme === 'dark' ? '#152232' : '#2b2d42';
  return (
    <Box
      sx={() => ({
        backgroundColor: isTop ? 'transparent' : lightBg,
        display: visible ? 'block' : 'none',
        transition: '0.2s',
        transitionTimingFunction: 'ease-in-out',
        // position: 'fixed',
        // top: 0,
        // zIndex: 100,

        width: '100%',
        '@media (max-width: 755px)': {
          fontSize: 14,
        },
      })}
    >
      <Container py={10} style={{ height: NAV_BAR_HEIGHT }}>
        <Group position="apart">
          <NextLink href="/">
            <Anchor>
              <Title order={3} style={{ color: '#bcbedc' }}>
                BLoom
              </Title>
            </Anchor>
          </NextLink>

          {lgScreen ? (
            <>
              <Group>
                <Link href="/browse/movies" passHref>
                  <Anchor className={classes.anchor}>movies</Anchor>
                </Link>
                <Link href="/browse/books" passHref>
                  <Anchor className={classes.anchor}>books</Anchor>
                </Link>
                <Link href="/browse/anime" passHref>
                  <Anchor className={classes.anchor}>anime</Anchor>
                </Link>
              </Group>
              <Group>
                <Link href="/login" passHref>
                  <Anchor className={classes.anchor}>Login</Anchor>
                </Link>
                <Link href="/signup" passHref>
                  <Button component="a" size="xs">
                    Sign up
                  </Button>
                </Link>
                <ColorSchemeToggle />
              </Group>
            </>
          ) : (
            <Group position="center">
              <ActionIcon onClick={() => setOpened(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </ActionIcon>
            </Group>
          )}

          <>
            <Drawer opened={opened} onClose={() => setOpened(false)} padding="xl" size="xl">
              <Stack align="center">
                <Link href="/movies" passHref>
                  <Anchor className={classes.anchor}>movies</Anchor>
                </Link>
                <Link href="/books" passHref>
                  <Anchor className={classes.anchor}>books</Anchor>
                </Link>
                <Link href="/anime" passHref>
                  <Anchor className={classes.anchor}>anime</Anchor>
                </Link>
                <Link href="/login" passHref>
                  <Anchor className={classes.anchor}>Login</Anchor>
                </Link>
                <Link href="/signup" passHref>
                  <Button component="a" size="xs">
                    Sign up
                  </Button>
                </Link>

                <ColorSchemeToggle />
              </Stack>
            </Drawer>
          </>
        </Group>
      </Container>
    </Box>
  );
}
