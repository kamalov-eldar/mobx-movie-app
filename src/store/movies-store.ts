import { TCast, TMovieDetail, TMovieItem, TResponseMovieDetail, TResponseMovieList, TVideo } from './../api/types';
import { action, computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import { IMoviesResponseKP, TCategoryType, TListType, TMovieKP } from '../types';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { fetchData, fetchMovie } from '../api/apiKinopoisk';
import tmdbApi from '../api/tmdbApi';
import { AxiosRequestConfig } from 'axios';

class MoviesStore {
    dataPopularMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    dataTopMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    dataSearchMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    dataUpcomingMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    dataSimilarMovieList?: IPromiseBasedObservable<TResponseMovieList>;

    /*******/
    upcomingMovieList: TMovieItem[] = [];
    topMovieList: TMovieItem[] = [];
    popularMovieList: TMovieItem[] = [];
    searchMovieList: TMovieItem[] = [];
    totalpages: number = 0;

    /**  search **/
    keyword: string = '';

    /*   detail   */
    movieDetail?: TMovieDetail;
    dataMovieDetail?: IPromiseBasedObservable<TMovieDetail>;
    casts: TCast[] = [];
    videos: TVideo[] = [];

    constructor() {
        makeObservable(this, {
            dataPopularMovieList: observable,
            popularMovieList: observable,
            dataTopMovieList: observable,
            topMovieList: observable,
            upcomingMovieList: observable,
            dataUpcomingMovieList: observable,
            dataSimilarMovieList: observable,
            searchMovieList: observable,
            dataSearchMovieList: observable,

            keyword: observable,
            movieDetail: observable,
            dataMovieDetail: observable,
            casts: observable,
            videos: observable,
            totalpages: observable,

            setKeyword: action,
            getMovieDetails: action,
            resetMovieDetails: action,
        });
    }

    setKeyword = (value: string) => {
        this.keyword = value;
    };

    getMovieList = (listType: TListType, params: AxiosRequestConfig<any> | undefined, id?: number) => {
        switch (listType) {
            case 'popular':
                this.dataPopularMovieList = fromPromise(
                    tmdbApi.getMovieList(listType, params).then((data) => {
                        const { page } = params?.params;
                        if (page === 1) {
                            this.popularMovieList = data.results;
                        } else {
                            this.popularMovieList.push(...data.results);
                        }
                        this.totalpages = data.total_pages;
                        return data;
                    }),
                );
                break;
            case 'top_rated':
                this.dataTopMovieList = fromPromise(
                    tmdbApi.getMovieList(listType, params).then((data) => {
                        const { page } = params?.params;
                        if (page === 1) {
                            this.topMovieList = data.results;
                        } else {
                            this.topMovieList.push(...data.results);
                        }
                        this.totalpages = data.total_pages;
                        return data;
                    }),
                );
                break;
            case 'upcoming':
                this.dataUpcomingMovieList = fromPromise(
                    tmdbApi.getMovieList(listType, params).then((data) => {
                        const { page } = params?.params;
                        if (page === 1) {
                            this.upcomingMovieList = data.results;
                        } else {
                            this.upcomingMovieList.push(...data.results);
                        }
                        this.totalpages = data.total_pages;
                        return data;
                    }),
                );
                break;
            case 'similar':
                this.dataSimilarMovieList = fromPromise(
                    tmdbApi.getMovieList(listType, params, id).then((data) => {
                        this.totalpages = data.total_pages;
                        return data;
                    }),
                );
                break;

            default:
                break;
        }
    };

    clearMovieList = () => {
        this.popularMovieList = [];
    };

    /*  getUpcomingMovieList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        tmdbApi.getMovieList(listType, params).then((data) => {
            const { page } = params?.params;
            if (page === 1) {
                this.upcomingMovieList = data.results;
            } else {
                this.upcomingMovieList.push(...data.results);
            }
            this.totalPagesUpcomingMovieList = data.total_pages;
        });
    }; */

    // imdbComingSoonList

    searchByKeyword = (category: TCategoryType, params: AxiosRequestConfig<any> | undefined) => {
        tmdbApi.searchByKeyword(category, params);
    };

    searchMovie = (category: TCategoryType, params: AxiosRequestConfig<any> | undefined) => {
        this.dataSearchMovieList = fromPromise(
            tmdbApi.search(category, params).then((data) => {
                const { page } = params?.params;
                if (page === 1) {
                    this.searchMovieList = data.results;
                } else {
                    this.searchMovieList.push(...data.results);
                }
                return data;
            }),
        );
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

    getCasts = (category: TCategoryType, id: number) => {
        tmdbApi.credits(category, id).then((data) => {
            this.casts = data.cast.slice(0, 5);
            // return data;
        });
    };

    resetCasts = () => {
        this.casts = [];
    };

    resetMoviesList = (listType: TListType) => {
        switch (listType) {
            case 'popular':
                this.popularMovieList = [];
                break;
            case 'top_rated':
                this.topMovieList = [];
                break;
            case 'upcoming':
                this.upcomingMovieList = [];
                break;

            default:
                break;
        }
    };

    getVideos = (category: TCategoryType, id: number) => {
        tmdbApi.getVideos(category, id).then((data) => {
            this.videos = data.results.slice(0, 2);
            return data;
        });
    };
}

export const moviesStore = new MoviesStore();
