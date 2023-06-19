import { TMovieItem, TResponseMovieList } from './../api/types';
import { makeAutoObservable, makeObservable, observable } from 'mobx';
import { IMoviesResponseKP, TMovieKP, TListMovieType } from '../types';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { fetchData, fetchMovie } from '../api/apiKinopoisk';
import tmdbApi from '../api/tmdbApi';
import { AxiosRequestConfig } from 'axios';

export interface IMoviesData {
    movies: IPromiseBasedObservable<TMovieKP[]>;
    isLoading: boolean;
    error: string | null;
    pagesCount: number;
}

class MoviesStore {
    dataKP?: IPromiseBasedObservable<IMoviesResponseKP>;
    //data = fromPromise(tmdbApi.getMoviesList('popular', { page: 1 }));
    data?: IPromiseBasedObservable<TResponseMovieList>;
    constructor() {
        makeObservable(this, {
            data: observable,
        });
    }

    /*  getMoviesKP = () => {
        this.dataKP = fromPromise(fetchData());
        // console.log('this.data: ', this.data);
        // this.movies = fromPromise(fetchData().then((data) => data.films));
    }; */

    getMovieList = (movieType: TListMovieType, params: AxiosRequestConfig<any> | undefined) => {
        this.data = fromPromise(tmdbApi.getMovieList(movieType, params).then((data) => data));
    };

    getInfoFilm = (movieId: number) => {
        const infoFilm = fromPromise(fetchMovie(movieId));
        // console.log('infoFilm: ', infoFilm);
    };
}

export const moviesStore = new MoviesStore();
