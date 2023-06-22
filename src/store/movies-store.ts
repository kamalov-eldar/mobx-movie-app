import {
    TCast,
    TCategoryType,
    TListType,
    TMovie,
    TMovieDetail,
    TMovieItem,
    TMovieListResponse,
    TResponseMovieDetail,
    TResponseMovieList,
    TVideo,
} from './../api/types';
import { action, computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import kpApi, { fetchData, fetchMovie } from '../api/apiKinopoisk';
import tmdbApi from '../api/tmdbApi';
import { AxiosRequestConfig } from 'axios';

class MoviesStore {
    dataTop100MovieList?: IPromiseBasedObservable<TMovieListResponse>;
    dataBestMoviesList?: IPromiseBasedObservable<TMovieListResponse>;
    dataAwaitMoviesList?: IPromiseBasedObservable<TMovieListResponse>;

    dataPopularMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    dataTopMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    dataSimilarMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    dataUpcomingMovieList?: IPromiseBasedObservable<TResponseMovieList>;

    /*******/
    upcomingMovieList: TMovieItem[] = [];
    totalPagesUpcomingMovieList: number = 0;

    /**  search **/
    keyword: string = '';

    /*   detail   */
    movieDetail?: TMovieDetail;
    dataMovieDetail?: IPromiseBasedObservable<TMovieDetail>;
    casts: TCast[] = [];
    videos: TVideo[] = [];

    constructor() {
        makeObservable(this, {
            dataTop100MovieList: observable,
            dataBestMoviesList: observable,
            dataAwaitMoviesList: observable,
            dataUpcomingMovieList: observable,

            /**tmdb**/
            dataPopularMovieList: observable,
            dataTopMovieList: observable,
            dataSimilarMovieList: observable,
            upcomingMovieList: observable,
            totalPagesUpcomingMovieList: observable,
            keyword: observable,
            movieDetail: observable,
            dataMovieDetail: observable,
            casts: observable,
            videos: observable,

            getTop100: action,
            setKeyword: action,
            getMovieDetails: action,
            resetMovieDetails: action,
        });
    }

    getTop100 = () => {
        this.dataTop100MovieList = fromPromise(
            kpApi.getMovieList('TOP_100_POPULAR_FILMS', 1).then((data) => {
                // console.log('data: ', data);
                return data;
            }),
        );
    };
    getBestFilms = () => {
        this.dataBestMoviesList = fromPromise(
            kpApi.getMovieList('TOP_250_BEST_FILMS', 1).then((data) => {
                // console.log('data: ', data);
                return data;
            }),
        );
    };
    getAwaitFilms = () => {
        this.dataAwaitMoviesList = fromPromise(
            kpApi.getMovieList('TOP_AWAIT_FILMS', 1).then((data) => {
                // console.log('data: ', data);
                return data;
            }),
        );
    };

    /** tmdb **/

    setKeyword = (value: string) => {
        this.keyword = value;
    };

    getMovieList = (listType: TListType, params: AxiosRequestConfig<any> | undefined, id?: number) => {
        switch (listType) {
            case 'popular':
                this.dataPopularMovieList = fromPromise(
                    tmdbApi.getMovieList(listType, params).then((data) => {
                        return data;
                    }),
                );
                break;
            case 'top_rated':
                this.dataTopMovieList = fromPromise(
                    tmdbApi.getMovieList(listType, params).then((data) => {
                        return data;
                    }),
                );
                break;
            case 'similar':
                this.dataSimilarMovieList = fromPromise(
                    tmdbApi.getMovieList(listType, params, id).then((data) => {
                        return data;
                    }),
                );
                break;

            default:
                break;
        }
    };

    getUpcomingMovieList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        this.dataUpcomingMovieList = fromPromise(
            tmdbApi.getMovieList(listType, params).then((data) => {
                const { page } = params?.params;
                if (page === 1) {
                    this.upcomingMovieList = data.results;
                } else {
                    this.upcomingMovieList.push(...data.results);
                }
                this.totalPagesUpcomingMovieList = data.total_pages;
                return data;
            }),
        );
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

    getCasts = (category: TCategoryType, id: number) => {
        tmdbApi.credits(category, id).then((data) => {
            this.casts = data.cast.slice(0, 5);
            // return data;
        });
    };
    resetCasts = () => {
        this.casts = [];
    };

    getVideos = (category: TCategoryType, id: number) => {
        tmdbApi.getVideos(category, id).then((data) => {
            this.videos = data.results.slice(0, 2);
            return data;
        });
    };
}

export const moviesStore = new MoviesStore();
