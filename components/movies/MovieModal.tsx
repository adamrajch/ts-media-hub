import { ActionIcon, Box, Group, Modal, Stack, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import ReactPlayer from 'react-player/lazy';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../../atoms/MovieModalAtom';
import useAuth from '../../hooks/useAuth';
import { Element, Genre } from '../../types/types';
import AddMenuModal from './AddMenuModal';

export default function MovieModal() {
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState('');
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [genres, setGenres] = useState<Genre[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${
          movie?.id
        }?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        );
        setTrailer(data.videos?.results[index]?.key);
      }

      console.log(data);
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  return (
    <Modal
      opened={showModal}
      onClose={() => setShowModal(false)}
      size="70%"
      padding={0}
      withCloseButton={false}
    >
      <Box sx={{ position: 'relative', padding: 6, minHeight: '60vh' }}>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: '0', left: '0' }}
          playing
          volume={0.5}
          controls
        />
      </Box>

      <Stack spacing={4} px={40} pt={10} pb={30}>
        <Group position="apart" sx={{}}>
          <Title>{movie?.title || movie?.name}</Title>
          <Group>
            <AddMenuModal isBanner={false} />
            <ActionIcon color="blue" variant="outline" size="xl" radius="xl">
              <AiOutlineHeart />
            </ActionIcon>
          </Group>
        </Group>
        <Group>
          <Text color="blue"> {movie!.vote_average * 10}% Match</Text>
          <Text> {movie?.release_date || movie?.first_air_date}</Text>
        </Group>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '@media (min-width: 755px)': {
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          }}
        >
          <Text align="left" sx={{ maxWidth: '60%' }}>
            {movie?.overview}
          </Text>

          <Text component="span">Genres: {genres.map((genre) => genre.name).join(', ')}</Text>
        </Box>
      </Stack>
    </Modal>
  );
}
