"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Moviecard from '@/components/Moviecard';
import { IShowtime } from "@/app/Model/showtime";
type MovieProps = {
      _id: string,
      title: string,
      duration: number,
      language: string,
      descriptions: object,
      posterUrl: string,
      trailerUrl: string,
      releaseDate: Date,
      showtimes: IShowtime[]
      rating: number[]
    }
const MoviesPage = () => {
  const params = useParams();
  const genre = params.movieid as string;
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`/api/movie/genre-based-movie?genre=${genre}`);
        if (response.status === 200) {
          setMovies(response.data.movies);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [genre]);

  if (loading) return <p>Loading movies...</p>;
  if (movies.length === 0) return <p>No movies found for {genre}</p>;

  return (
    <div className='mb-5 flex flex-wrap gap-8 sm:items-start justify-center rounded mt-5'>
      {movies.map((movie) => (
        <Moviecard 
          key={movie._id}
          movieId={movie._id}
          movieTitle={movie.title}
          moviePosterUrl={movie.posterUrl}
          rating={movie.rating}
        />
      ))}
    </div>
  );
};

export default MoviesPage;
