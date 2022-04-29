/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Stack } from '@mantine/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState, movieState } from '../../../atoms/MovieModalAtom';
import Wrapper from '../../../components/Layout/Wrapper';
import Banner from '../../../components/movies/Banner';
import MovieModal from '../../../components/movies/MovieModal';
import MoviesRow from '../../../components/movies/MoviesRow';
import { Movie } from '../../../types/types';
import { requests } from '../../../utils/movies/requests';

interface Props {
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  popular: Movie[];
}

const MoviesHome = ({
  trendingNow,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  popular,
}: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const movie = useRecoilValue(movieState);
  return (
    <Wrapper>
      {/* <MovieSearch /> */}

      <Stack spacing={40}>
        <Banner trendingNow={trendingNow} />
        <MoviesRow title="Trending Now" movies={trendingNow} />
        {/* <MoviesRow title="Popular" movies={popular} /> */}
        <MoviesRow title="Top Rated" movies={topRated} />
        <MoviesRow title="Action" movies={actionMovies} />
        <MoviesRow title="Comedy" movies={comedyMovies} />
        <MoviesRow title="documentaries" movies={documentaries} />
        <MoviesRow title="Horror" movies={horrorMovies} />
        <MoviesRow title="Romance" movies={romanceMovies} />
      </Stack>
      {showModal && <MovieModal />}
    </Wrapper>
  );
};

export default MoviesHome;

export const getServerSideProps = async () => {
  const [
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
    popular,
  ] = await Promise.all([
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
    fetch(requests.fetchPopular).then((res) => res.json()),
  ]);

  return {
    props: {
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      popular: popular.results,
    },
  };
};
