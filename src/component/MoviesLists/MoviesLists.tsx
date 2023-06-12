import { FC, useEffect } from 'react';
import { moviesStore } from '../../store/movies-store';
import { MovieItem } from '../MovieItem/MovieItem';
import { TMovie } from '../../types';
import { observer } from 'mobx-react-lite';
import '../MoviesLists/MoviesLists.scss';

export const MoviesLists: FC = observer(() => {
    console.log('MoviesLists: ');
    const { getMovies, getInfoFilm } = moviesStore;

    console.log('moviesStore.data: ', moviesStore.data);

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
                    {data.films.map((movie: TMovie) => {
                        /*  const infoFilm = getInfoFilm(movie.filmId);
                        console.log('infoFilm: ', infoFilm); */
                        return <MovieItem key={movie.filmId} movie={movie} />;
                    })}
                </div>
            );
        },
    });
});
