import {
    TCast,
    TCategoryType,
    TImdbComingSoonListResponse,
    TListType,
    TMovieKP,
    TMovieDetail,
    TMovieItem,
    TMovieListResponse,
    TResponseMovieDetail,
    TResponseMovieList,
    TVideo,
    TMovie,
    TIMDbMovie,
} from './../api/types';
import { AxiosRequestConfig } from 'axios';
import { action, computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import kpApi from '../api/apiKinopoisk';
import tmdbApi from '../api/tmdbApi';
import IMDbApi from '../api/IMDbApi';

class MoviesStore {
    dataTop100MovieList?: IPromiseBasedObservable<TMovieListResponse>;
    top100MovieList: TMovie[] = [];
    dataBestMoviesList?: IPromiseBasedObservable<TMovieListResponse>;

    dataPopularMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    dataTopMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    dataSearchList?: IPromiseBasedObservable<TResponseMovieList>;
    dataUpcomingMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    dataSimilarMovieList?: IPromiseBasedObservable<TResponseMovieList>;
    dataUpcomingMovieList?: IPromiseBasedObservable<TResponseMovieList>;

    /** IMDb */
    dataImdbComingSoonList?: IPromiseBasedObservable<TImdbComingSoonListResponse>;
    imdbComingSoonList: TMovie[] = [];

    /*******/
    upcomingMovieList: TMovieItem[] = [];
    topMovieList: TMovieItem[] = [];
    popularMovieList: TMovieItem[] = [];
    searchList: TMovieItem[] = [];
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
            /** KP */
            dataTop100MovieList: observable,
            top100MovieList: observable,
            dataBestMoviesList: observable,

            /**IMDb */
            dataImdbComingSoonList: observable,
            imdbComingSoonList: observable,

            /**tmdb**/
            dataUpcomingMovieList: observable,
            dataPopularMovieList: observable,
            popularMovieList: observable,
            dataTopMovieList: observable,
            topMovieList: observable,
            upcomingMovieList: observable,
            dataUpcomingMovieList: observable,
            dataSimilarMovieList: observable,
            searchList: observable,
            dataSearchList: observable,

            keyword: observable,
            movieDetail: observable,
            dataMovieDetail: observable,
            casts: observable,
            videos: observable,
            totalpages: observable,

            getTop100: action,
            setKeyword: action,
            getMovieDetails: action,
            resetMovieDetails: action,
        });
    }

    getTop100 = () => {
        this.dataTop100MovieList = fromPromise(
            kpApi.getMovieList('TOP_100_POPULAR_FILMS', 1).then((data) => {
                this.top100MovieList = data.data.films.map((item) => {
                    const movie: TMovie = {
                        id: item.filmId,
                        name: item.nameEn,
                        image: item.posterUrlPreview,
                    };
                    return movie;
                });
                return data;
            }),
        );
    };
    get250BestFilms = () => {
        this.dataBestMoviesList = fromPromise(
            kpApi.getMovieList('TOP_250_BEST_FILMS', 1).then((data) => {
                // console.log('data: ', data);
                return data;
            }),
        );
    };

    getImdbComingSoonList = () => {
        this.dataImdbComingSoonList = fromPromise(
            IMDbApi.imdbComingSoon().then((data) => {
                this.imdbComingSoonList = data.data.items
                    .filter((data) => data.year === String(new Date().getFullYear()))
                    .map((item) => {
                        const movie: TMovie = {
                            id: item.id,
                            name: item.fullTitle,
                            image: item.image,
                        };
                        return movie;
                    });
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
        this.dataSearchList = fromPromise(
            tmdbApi.search(category, params).then((data) => {
                const { page } = params?.params;
                if (page === 1) {
                    this.searchList = data.results;
                } else {
                    this.searchList.push(...data.results);
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

    clearMovieList = () => {
        this.popularMovieList = [];
    };

    getVideos = (category: TCategoryType, id: number) => {
        tmdbApi.getVideos(category, id).then((data) => {
            this.videos = data.results.slice(0, 2);
            return data;
        });
    };
}

export const moviesStore = new MoviesStore();
