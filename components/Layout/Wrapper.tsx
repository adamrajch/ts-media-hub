import { Container } from '@mantine/core';
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
      </Container>
    </div>
  );
}
