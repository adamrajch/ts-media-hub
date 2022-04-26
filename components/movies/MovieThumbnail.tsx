import { Image } from '@mantine/core';
// import Image from 'next/image';
import { Movie } from '../../types/types';

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  return (
    // <Box
    //   sx={() => ({
    //     height: '100px',
    //     aspectRatio: '16/9',
    //     position: 'relative',
    //     cusror: 'pointer',
    //     transition: 'all .2s ease-out',
    //     '&:hover': {},
    //   })}
    // >
    //   <Image
    //     src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
    //     layout="fill"
    //     style={{ cursor: 'pointer' }}
    //   />
    // </Box>

    <Image
      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
      // caption={movie.title || movie.name}
      alt={movie.title || movie.name}
      withPlaceholder
      sx={() => ({
        height: '100px',
        aspectRatio: '16/9',
        // position: 'relative',
        cursor: 'pointer',
        transition: 'all .2s ease-out',

        '&:hover': {
          transform: 'scale(1.1)',
          color: 'blue',
        },
      })}
    />
  );
}

export default Thumbnail;
