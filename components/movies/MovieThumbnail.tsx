import { Box } from '@mantine/core';
import Image from 'next/image';
import { Movie } from '../../types/types';

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  return (
    <Box
      sx={() => ({
        height: '28px',
        minWidth: '180px',
      })}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
        height={100}
        width={100}
      />
    </Box>
  );
}

export default Thumbnail;
