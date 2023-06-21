import { TMovieDetail, TMovieItem, TResponseMovieDetail, TResponseMovieList } from './../api/types';
import { action, computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import { IMoviesResponseKP, TCategoryType, TListType, TMovieKP } from '../types';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { fetchData, fetchMovie } from '../api/apiKinopoisk';
import tmdbApi from '../api/tmdbApi';
import { AxiosRequestConfig } from 'axios';

export type TParams = {
    page: number;
    language: string;
};
class MoviesStore {
    dataPopularMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    dataTopMovieList?: IPromiseBasedObservable<TResponseMovieList>;

    /*******/
    upcomingMovieList: TMovieItem[] = [];
    totalPagesUpcomingMovieList: number = 0;

    /**  search **/
    keyword: string = '';

    /*   detail   */
    movieDetail?: TMovieDetail;
    dataMovieDetail?: IPromiseBasedObservable<TMovieDetail>;

    constructor() {
        makeObservable(this, {
            dataPopularMovieList: observable,
            dataTopMovieList: observable,
            upcomingMovieList: observable,
            totalPagesUpcomingMovieList: observable,
            keyword: observable,
            movieDetail: observable,
            dataMovieDetail: observable,

            setKeyword: action,
            getMovieDetails: action,
            resetMovieDetails: action,
        });
    }

    setKeyword = (value: string) => {
        this.keyword = value;
    };

    getPopularMovieList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        this.dataPopularMovieList = fromPromise(
            tmdbApi.getMovieList(listType, params).then((data) => {
                return data;
            }),
        );
    };

    getTopMovieList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        this.dataTopMovieList = fromPromise(tmdbApi.getMovieList(listType, params).then((data) => data));
    };

    getUpcomingMovieList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        tmdbApi.getMovieList(listType, params).then((data) => {
            const { page } = params?.params;
            if (page === 1) {
                this.upcomingMovieList = data.results;
            } else {
                this.upcomingMovieList.push(...data.results);
            }
            this.totalPagesUpcomingMovieList = data.total_pages;
        });
    };

    searchByKeyword = (category: TCategoryType, params: AxiosRequestConfig<any> | undefined) => {
        tmdbApi.searchByKeyword(category, params);
    };

    searchMovie = (category: TCategoryType, params: AxiosRequestConfig<any> | undefined) => {
        tmdbApi.search(category, params).then((data) => {
            const { page } = params?.params;
            if (page === 1) {
                this.upcomingMovieList = data.results;
            } else {
                this.upcomingMovieList.push(...data.results);
            }
            this.totalPagesUpcomingMovieList = data.total_pages;
        });
    };

    getMovieDetails = (category: TCategoryType, id: number, params: AxiosRequestConfig<any> | undefined) => {
        this.dataMovieDetail = fromPromise(
            tmdbApi.detail(category, id, params).then((data) => {
                this.movieDetail = data;
                return data;
            }),
        );
    };
    resetMovieDetails = () => {
        this.movieDetail = undefined;
    };
}

export const moviesStore = new MoviesStore();
