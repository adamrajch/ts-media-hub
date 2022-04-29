import { Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../../atoms/MovieModalAtom';
import { Movie } from '../../types/types';
import AddMenuModal from './AddMenuModal';

const baseUrl = 'https://image.tmdb.org/t/p/original/';
type BannerProps = {
  trendingNow: Movie[];
};

export default function Banner({ trendingNow }: BannerProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  useEffect(() => {
    setMovie(trendingNow[Math.floor(Math.random() * trendingNow.length)]);
  }, [trendingNow]);

  console.log(movie);
  return (
    <Box sx={{ position: 'relative', height: '40vh', width: '100%' }}>
      <Box
        sx={{ position: 'absolute', top: 0, left: 0, zIndex: -20, width: '100%', height: '40vh' }}
      >
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          width="100%"
          layout="fill"
          objectFit="cover"
          style={{ filter: ' brightness(50%)' }}
        />
      </Box>

      <Stack
        justify="center"
        sx={{
          color: 'white',
          width: '50%',
          paddingLeft: 30,
          height: '100%',
          textShadow: '0 1px 0px #ffffff',
        }}
      >
        <Title order={4} style={{ fontStyle: 'italic', letterSpacing: 2 }}>
          Staff Pick- Adam
        </Title>
        <Title sx={{ letterSpacing: 3 }}>
          {movie?.title || movie?.name || movie?.original_name}
        </Title>
        <Text> {movie?.overview}</Text>
        <Group>
          <Button
            onClick={() => {
              setCurrentMovie(movie);
              setShowModal(true);
            }}
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
          >
            Play Trailer
          </Button>
          <AddMenuModal movie={movie} />
        </Group>
      </Stack>
    </Box>
  );
}
