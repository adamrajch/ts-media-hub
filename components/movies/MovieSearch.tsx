import { ActionIcon, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MagnifyingGlassIcon } from '@modulz/radix-icons';
import React, { useState } from 'react';
import { Movie } from '../../types/types';
import { search } from '../../utils/movies/requests';
import MoviesRow from './MoviesRow';

export default function MovieSearch() {
  const [results, setResults] = useState<Movie[] | null>(null);

  const form = useForm({
    initialValues: {
      query: '',
    },

    validate: {
      query: (value) => (value.length < 20 ? null : 'Too long'),
    },
  });

  type FormValues = typeof form.values;

  const handleSubmit = async (values: FormValues) => {
    console.log('search query: ', values);
    const queryString = `${search.fetchMovieQuery}${values.query}`;
    console.log(queryString);
    const data = await fetch(queryString).then((res) => res.json());

    console.log(data);
    setResults(data.results);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          required
          placeholder="Search movie titles"
          {...form.getInputProps('query')}
          rightSection={
            <ActionIcon variant="transparent" component="button" type="submit">
              <MagnifyingGlassIcon />
            </ActionIcon>
          }
          onKeyDown={(e) => {
            e.key === 'Enter' && handleSubmit(form.values);
          }}
        />

        {results && results?.length > 0 ? (
          <MoviesRow title="Search Results" movies={results} />
        ) : null}
        {results && results.length === 0 && (
          <Title order={2}>No results...try a different search!</Title>
        )}
      </Stack>
    </form>
  );
}
