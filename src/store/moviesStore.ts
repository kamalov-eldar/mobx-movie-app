import {
    action,
    makeAutoObservable,
    observable,
    makeObservable,
    runInAction,
} from 'mobx';
import { TMovie } from '../types';
import { fetchData } from '../api/api';

export interface IMoviesData {
    movies: TMovie[];
    isLoading: boolean;
    error: string | null;
    pagesCount: number;
}
class MoviesStore implements IMoviesData {
    movies = [];
    isLoading = false;
    error = null;
    pagesCount = 0;

    constructor() {
        makeAutoObservable(this);
        /* makeObservable(this, , {
            movies: observable,
            isLoading: observable,
            pagesCount: observable,
        });
        */
    }

    get getMovies = async () => {
        console.log('getMovies: ');

        try {
            this.isLoading = true;
            const res = await fetchData();

            // console.log('res: ', JSON.stringify(res.films));

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
            /*  runInAction(() => {
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
                this.pagesCount = res.pagesCount;
                this.isLoading = false;
            }); */
        } catch {
            this.isLoading = false;
        }
    };
}

export default new MoviesStore();
