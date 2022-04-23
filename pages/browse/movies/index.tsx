/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Wrapper from '../../../components/Layout/Wrapper';
import Banner from '../../../components/movies/Banner';
import MoviesRow from '../../../components/movies/MoviesRow';
import { Movie } from '../../../types/types';
import requests from '../../../utils/movies/requests';

interface Props {
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const MoviesHome = ({
  trendingNow,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
}: Props) => {
  return (
    <Wrapper>
      <Banner trendingNow={trendingNow} />
      <MoviesRow title="Trending Now" movies={trendingNow} />
      <MoviesRow title="topRated" movies={topRated} />
      <MoviesRow title="actionMovies" movies={actionMovies} />
      <MoviesRow title="comedyMovies" movies={comedyMovies} />
      <MoviesRow title="documentaries" movies={documentaries} />
      <MoviesRow title="horrorMovies" movies={horrorMovies} />
      <MoviesRow title="romanceMovies" movies={romanceMovies} />
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
  ] = await Promise.all([
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
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
    },
  };
};
