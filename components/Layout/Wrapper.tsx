import { Anchor, Box, Container, Divider, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { ExternalLinkIcon, GitHubLogoIcon } from '@modulz/radix-icons';
import React from 'react';
import Nav from '../Nav/Nav';

type WrapperProps = {
  children: React.ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div>
      <Nav />
      <Container
        size="xl"
        sx={() => ({
          //   marginTop: 100,
          marginTop: 60,
          '@media (max-width: 755px)': {
            fontSize: 14,
          },
        })}
      >
        {children}

        <Box my={20} py={40}>
          <Divider my="xl" />
          <Stack>
            <Group position="center">
              <Anchor href="https://github.com/adamrajch" target="_blank">
                <ThemeIcon>
                  <GitHubLogoIcon />
                </ThemeIcon>
              </Anchor>
              <Anchor href="https://adamrajchwald.com" target="_blank">
                <ThemeIcon>
                  <ExternalLinkIcon />
                </ThemeIcon>
              </Anchor>
            </Group>
            <Text align="center">Built Different by adamrajch</Text>
          </Stack>
        </Box>
      </Container>
    </div>
  );
}
