import { Group } from '@mantine/core';
import React from 'react';
import { Movie } from '../../types/types';
import Thumbnail from './MovieThumbnail';

type MoviesRowProps = {
  title: string;
  movies: Movie[];
};

export default function MoviesRow({ title, movies }: MoviesRowProps) {
  return (
    <div>
      {title}
      <Group noWrap>
        {movies.map((movie) => (
          <Thumbnail key={movie.id} movie={movie} />
        ))}
      </Group>
    </div>
  );
}
