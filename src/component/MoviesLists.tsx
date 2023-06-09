import { FC, useEffect } from 'react';
import MoviesStore from '../store/moviesStore';
import { MovieItem } from './MovieItem';
import { TMovie } from '../types';

export const MoviesLists: FC = () => {
    const { getMovies, movies } = MoviesStore;
    useEffect(() => {
        console.log('useEffect: ');
        getMovies();
    }, []);

    console.log('movies: ', JSON.stringify(movies));

    return (
        <div>
            {movies.map((movie: TMovie) => (
                <MovieItem movie={movie} />
            ))}
        </div>
    );
};
