import { FC, useEffect } from 'react';
import { moviesStore } from '../../store/moviesStore';
import { MovieItem } from '../MovieItem/MovieItem';
import { TMovie } from '../../types';
import { observer } from 'mobx-react-lite';

export const MoviesLists: FC = observer(() => {
    const { getMovies } = moviesStore;

    useEffect(() => {
        console.log('useEffect: ');
        getMovies();
    }, []);

    // Без этого ругается TS
    if (!moviesStore.data) {
        return null;
    }

    return moviesStore.data?.case({
        pending: () => (
            <div className="loader">
                <span className="loader__text">Загрузка...</span>
            </div>
        ),
        rejected: () => <div>Error</div>,
        fulfilled: (data) => {
            return (
                <div className="movies">
                    {data.films.map((movie: TMovie) => (
                        <MovieItem key={movie.filmId} movie={movie} />
                    ))}
                </div>
            );
        },
    });
});
