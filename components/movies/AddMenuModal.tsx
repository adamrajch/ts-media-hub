import {
  ActionIcon,
  Button,
  Group,
  Modal,
  MultiSelect,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { PlusIcon } from '@modulz/radix-icons';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { movieState } from '../../atoms/MovieModalAtom';
import { Movie } from '../../types/types';

interface AddMenuModalProps {
  isBanner?: boolean;
  movie?: Movie | null;
}
const data = [
  { value: 'react', label: 'React' },
  { value: 'ng', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue' },
  { value: 'riot', label: 'Riot' },
  { value: 'next', label: 'Next.js' },
  { value: 'blitz', label: 'Blitz.js' },
];
export default function AddMenuModal({ isBanner = true, movie }: AddMenuModalProps) {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
    },

    validate: {
      name: (value) => (value.length < 15 ? null : 'Invalid email'),
    },
  });

  const currMovie = movie || currentMovie;
  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Stack>
            <MultiSelect
              data={data}
              label={`Add ${currMovie?.title || currMovie?.name} to list`}
              placeholder="Pick all that you like"
            />
            <Text align="center">Or</Text>
            {/* <Divider my="xl" /> */}
            <TextInput
              label="Create a list and add"
              placeholder="List name"
              {...form.getInputProps('name')}
            />
            <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} type="submit">
              Add to list
            </Button>
          </Stack>
        </form>
      </Modal>

      <Group position="center">
        {isBanner ? (
          <Button
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            onClick={() => setOpened(true)}
          >
            Add to list
          </Button>
        ) : (
          <ActionIcon
            color="blue"
            variant="outline"
            size="xl"
            radius="xl"
            onClick={() => setOpened(true)}
          >
            <PlusIcon />
          </ActionIcon>
        )}
      </Group>
    </>
  );
}
