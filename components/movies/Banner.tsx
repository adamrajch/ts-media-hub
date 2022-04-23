import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/types';

type BannerProps = {
  trendingNow: Movie[];
};

export default function Banner({ trendingNow }: BannerProps) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(trendingNow[Math.floor(Math.random() * trendingNow.length)]);
  }, [trendingNow]);

  console.log(movie);
  return <div>banner</div>;
}
