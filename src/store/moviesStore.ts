import { makeAutoObservable } from 'mobx';
import { MoviesResponse, TMovie } from '../types';
import { fetchData } from '../api/api';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';

export interface IMoviesData {
    movies: IPromiseBasedObservable<TMovie[]>;
    isLoading: boolean;
    error: string | null;
    pagesCount: number;
}
class MoviesStore {
    data?: IPromiseBasedObservable<MoviesResponse>;
    movies?: IPromiseBasedObservable<TMovie[]>;

    isLoading = false;
    error = null;
    pagesCount = 0;

    constructor() {
        makeAutoObservable(this);
    }

    getMovies = () => {
        console.log('getMovies: ');
        this.data = fromPromise(fetchData());
        this.movies = fromPromise(fetchData().then((data) => data.films));
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
