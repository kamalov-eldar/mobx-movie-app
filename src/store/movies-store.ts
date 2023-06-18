import { makeAutoObservable } from 'mobx';
import { IMoviesResponseKP, TMovieKP } from '../types';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { fetchData, fetchMovie } from '../api/apiKinopoisk';

export interface IMoviesData {
    movies: IPromiseBasedObservable<TMovieKP[]>;
    isLoading: boolean;
    error: string | null;
    pagesCount: number;
}

class MoviesStore {
    data?: IPromiseBasedObservable<IMoviesResponseKP>;

    constructor() {
        makeAutoObservable(this);
    }

    getMovies = () => {
        console.log('getMovies: ');
        this.data = fromPromise(fetchData());
        // console.log('this.data: ', this.data);
        // this.movies = fromPromise(fetchData().then((data) => data.films));
    };
    getInfoFilm = (movieId: number) => {
        const infoFilm = fromPromise(fetchMovie(movieId));
        // console.log('infoFilm: ', infoFilm);
    };
}

export const moviesStore = new MoviesStore();

//export default new MoviesStore();
/*  try {
            this.isLoading = true;
            const res = await fetchData();
            console.log('res: ', res);

            this.movies = res.films.map((item: any) => item);
            this.pagesCount = res.pagesCount;

             this.movies = res.films.map((item: any) => {
                const film: TMovie = {
                    filmId: item.filmId,
                    filmLength: item.filmLength,
                    nameEn: item.nameEn,
                    nameRu: item.nameRu,
                    posterUrl: item.posterUrl,
                    rating: item.rating,
                    year: item.year,
                };
                return film;
            });
              runInAction(() => {
                // runInAction объединение в 1 изменение = 1 перерендер
                this.movies = res.films.map((item: any) => {
                    const film: TMovie = {
                        filmId: item.filmId,
                        filmLength: item.filmLength,
                        nameEn: item.nameEn,
                        nameRu: item.nameRu,
                        posterUrl: item.posterUrl,
                        rating: item.rating,
                        year: item.year,
                    };
                    return film;
                });
                this.isLoading = false;
            });
        } catch {
            this.isLoading = false;
        }
        */
