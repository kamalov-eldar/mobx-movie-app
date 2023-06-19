import { TMovieItem, TResponseMovieList } from './../api/types';
import { makeAutoObservable, makeObservable, observable } from 'mobx';
import { IMoviesResponseKP, TListType, TMovieKP } from '../types';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { fetchData, fetchMovie } from '../api/apiKinopoisk';
import tmdbApi from '../api/tmdbApi';
import { AxiosRequestConfig } from 'axios';

class MoviesStore {
    dataPopularMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    dataTopMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    constructor() {
        makeObservable(this, {
            dataPopularMovieList: observable,
            dataTopMovieList: observable,
        });
    }

    getPopularMovieList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        this.dataPopularMovieList = fromPromise(tmdbApi.getMovieList(listType, params).then((data) => data));
    };
    getTopMovieList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        this.dataTopMovieList = fromPromise(tmdbApi.getMovieList(listType, params).then((data) => data));
    };
}

export const moviesStore = new MoviesStore();
