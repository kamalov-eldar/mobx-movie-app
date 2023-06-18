import { FC, useEffect } from 'react';
import { MovieItem } from '../MovieItem/MovieItem';
import { TMovieKP } from '../../types';
import { observer } from 'mobx-react-lite';
import '../MoviesLists/MoviesLists.scss';
import { useStores } from '../../root-store-context';

export const MoviesLists: FC = observer(() => {
    console.log('MoviesLists: ');
    const {
        moviesStore: { getMovies, getInfoFilm, data },
    } = useStores();

    // const { getMovies, getInfoFilm } = moviesStore;

    useEffect(() => {
        console.log('useEffect: ');
        getMovies();
    }, []);

    // Без этого ругается TS
    if (!data) {
        return null;
    }

    return data?.case({
        pending: () => (
            <div className="loader">
                <span className="loader__text">Загрузка...</span>
            </div>
        ),
        rejected: () => <div>Error</div>,
        fulfilled: (data) => {
            return (
                <div className="movies">
                    {data.films.map((movie: TMovieKP) => {
                        /*  const infoFilm = getInfoFilm(movie.filmId);
                        console.log('infoFilm: ', infoFilm); */
                        return <MovieItem key={movie.filmId} movie={movie} />;
                    })}
                </div>
            );
        },
    });
});
