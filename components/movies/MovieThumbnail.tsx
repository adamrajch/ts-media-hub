/* eslint-disable @typescript-eslint/no-unused-vars */
import { Stack, Text } from '@mantine/core';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../../atoms/MovieModalAtom';
import { Movie } from '../../types/types';

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);

  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  return (
    <Stack onClick={() => setCurrentMovie(movie)}>
      {/* <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path || '/placeholder-image.png'
        }`}
        alt={movie.title || movie.name}
        sx={() => ({
          height: '180px',
          aspectRatio: '16/9',
          cursor: 'pointer',
          transition: 'all .2s ease-out',

          '&:hover': {
            transform: 'scale(1.05)',
            color: 'blue',
            overflowY: 'hidden',
          },
        })}
        placeholder={<Text align="center"> {movie.title || movie.name}</Text>}
        // withPlaceholder
        onClick={() => setShowModal(true)}
      /> */}
      <div
        style={{
          position: 'relative',
          height: '180px',
          aspectRatio: '16/9',
          transition: 'all .2s ease-out',
        }}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path || '/placeholder-image.png'
          }`}
          alt={movie.title || movie.name}
          layout="fill"
          style={{
            cursor: 'pointer',
          }}
          onClick={() => setShowModal(true)}
        />
      </div>
      <Text align="center">{movie.title || movie.name || ' '}</Text>
    </Stack>
  );
}

export default Thumbnail;
