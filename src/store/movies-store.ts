import { TMovieItem, TResponseMovieList } from './../api/types';
import { computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import { IMoviesResponseKP, TListType, TMovieKP } from '../types';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { fetchData, fetchMovie } from '../api/apiKinopoisk';
import tmdbApi from '../api/tmdbApi';
import { AxiosRequestConfig } from 'axios';

class MoviesStore {
    dataPopularMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    dataTopMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    dataFutureMovieList?: IPromiseBasedObservable<TResponseMovieList>;

    //dataFutureMovieList = fromPromise(tmdbApi.getMovieList('upcoming', { page: 1, language: 'ru-RU' } as any));

    /*******/
    upcomingMovieList: TMovieItem[] = [];
    totalPagesMovieList: number = 0;

    constructor() {
        makeObservable(this, {
            dataPopularMovieList: observable,
            dataTopMovieList: observable,
            upcomingMovieList: observable,
            totalPagesMovieList: observable,

            // totalPagesMovieList: computed,
        });
    }

    /*  get totalPagesMovieList() {
        if (this.dataFutureMovieList?.state === 'fulfilled') return this.dataFutureMovieList.value.total_pages;
        return 0;
    } */

    getPopularMovieList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        this.dataPopularMovieList = fromPromise(tmdbApi.getMovieList(listType, params).then((data) => data));
    };

    getMovieList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        //this.dataMovieList = tmdbApi.getMovieList(listType, params).then((data) => data.results);
    };
    getTopMovieList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        this.dataTopMovieList = fromPromise(tmdbApi.getMovieList(listType, params).then((data) => data));
    };

    getUpcomingMovieList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        tmdbApi.getMovieList(listType, params).then((data) => {
            //this.dataFutureMovieList?.value.data.results
            this.upcomingMovieList.push(...data.results);
            this.totalPagesMovieList = data.total_pages;
        });
    };
}

export const moviesStore = new MoviesStore();
