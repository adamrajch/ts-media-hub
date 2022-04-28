/* eslint-disable @typescript-eslint/no-unused-vars */
import { Image, Stack, Text } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../../atoms/MovieModalAtom';
// import Image from 'next/image';
import { Movie } from '../../types/types';

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);

  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  return (
    <Stack onClick={() => setCurrentMovie(movie)}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
        // caption={movie.title || movie.name}
        alt={movie.title || movie.name}
        withPlaceholder
        sx={() => ({
          height: '180px',
          aspectRatio: '16/9',
          // position: 'relative',
          cursor: 'pointer',
          transition: 'all .2s ease-out',

          '&:hover': {
            transform: 'scale(1.05)',
            color: 'blue',
          },
        })}
        onClick={() => setShowModal(true)}
      />
      <Text align="center">{movie.title || movie.name}</Text>
    </Stack>
  );
}

export default Thumbnail;
