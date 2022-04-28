import {
  ActionIcon,
  Anchor,
  Button,
  Container,
  Group,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import Wrapper from '../components/Layout/Wrapper';
import useAuth from '../hooks/useAuth';

export default function Signup() {
  const { signUp } = useAuth();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 15 ? 'password too long' : null),
    },
  });

  type FormValues = typeof form.values;

  const handleSubmit = async (values: FormValues) => {
    await signUp(values.email, values.password);
  };

  return (
    <Wrapper>
      <Container size="xs" px={0}>
        <Title align="center">Sign Up</Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps('email')}
            />
            <TextInput
              type="password"
              required
              label="Password"
              {...form.getInputProps('password')}
            />
            <Link href="signup" passHref>
              <Anchor>Already have an account? Sign in</Anchor>
            </Link>
            <Button type="submit">Submit</Button>
            <Group>
              <ActionIcon>
                <AiFillGithub />
              </ActionIcon>
            </Group>
          </Stack>
        </form>
      </Container>
    </Wrapper>
  );
}
