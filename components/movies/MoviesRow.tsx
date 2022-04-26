import { ActionIcon, Group, Stack, Title } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { ChevronLeftIcon, ChevronRightIcon } from '@modulz/radix-icons';
import React, { useRef, useState } from 'react';
import { Movie } from '../../types/types';
import Thumbnail from './MovieThumbnail';

type MoviesRowProps = {
  title: string;
  movies: Movie[];
};

export default function MoviesRow({ title, movies }: MoviesRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { hovered, ref } = useHover();
  const [isMoved, setIsMoved] = useState<boolean>(false);
  const [isLeftMost, setIsLeftMost] = useState<boolean>(true);
  const handleClick = (dir: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = dir === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      console.log(scrollTo);
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });

      if (scrollTo <= 0) {
        setIsLeftMost(true);
      } else {
        setIsLeftMost(false);
      }
    }
  };

  return (
    <Stack>
      <Title order={4}>{title}</Title>
      <Group
        ref={ref}
        noWrap
        sx={{
          position: 'relative',
        }}
      >
        <ActionIcon
          variant="transparent"
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 2,
            zIndex: 50,
            margin: 'auto',
            cursor: 'pointer',
            display: !isLeftMost && hovered ? 'block' : 'none',
            '&:hover': {
              transform: 'scale(1.8)',
            },
          }}
          onClick={() => handleClick('left')}
        >
          <ChevronLeftIcon />
        </ActionIcon>
        <Group
          ref={rowRef}
          noWrap
          sx={{
            // height: 150,
            overflowX: 'hidden',
            overflowY: 'hidden',
          }}
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </Group>
        <ActionIcon
          variant="transparent"
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 2,
            zIndex: 50,
            margin: 'auto',
            cursor: 'pointer',
            display: hovered ? 'block' : 'none',
            '&:hover': {
              transform: 'scale(1.8)',
            },
          }}
          onClick={() => handleClick('right')}
        >
          <ChevronRightIcon />
        </ActionIcon>
      </Group>
    </Stack>
  );
}
