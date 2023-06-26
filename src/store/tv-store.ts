import { TItemTV, TMovieItem, TResponseMovieList, TResponseTVList } from '../api/types';
import { computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import { IMoviesResponseKP, TListType, TMovieKP } from '../types';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { fetchData, fetchMovie } from '../api/apiKinopoisk';
import tmdbApi from '../api/tmdbApi';
import { AxiosRequestConfig } from 'axios';

class TVStore {
    dataPopularTVList?: IPromiseBasedObservable<TResponseTVList>;
    dataTopTVList?: IPromiseBasedObservable<TResponseTVList>;

    /*****/
    popularTVList: TItemTV[] = [];
    topTVList: TItemTV[] = [];

    constructor() {
        makeObservable(this, {
            dataPopularTVList: observable,
            dataTopTVList: observable,
            topTVList: observable,
            popularTVList: observable,

            totalPagesTVList: computed,
        });
    }

    get totalPagesTVList() {
        if (this.dataPopularTVList?.state === 'fulfilled') return this.dataPopularTVList.value.total_pages;
        return 0;
    }



    getTVList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        switch (listType) {
            case 'popular':
                this.dataPopularTVList = fromPromise(
                    tmdbApi.getTvList(listType, params).then((data) => {
                        const { page } = params?.params;
                        if (page === 1) {
                            this.popularTVList = data.results;
                        } else {
                            this.popularTVList.push(...data.results);
                        }
                        return data;
                    }),
                );
                break;
            case 'top_rated':
                this.dataTopTVList = fromPromise(
                    tmdbApi.getTvList(listType, params).then((data) => {
                        const { page } = params?.params;
                        if (page === 1) {
                            this.topTVList = data.results;
                        } else {
                            this.topTVList.push(...data.results);
                        }
                        return data;
                    }),
                );
                break;
            default:
                break;
        }
    };

    getPopularTVListLoadMore = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        this.dataPopularTVList = fromPromise(
            tmdbApi.getTvList(listType, params).then((data) => {
                const { page } = params?.params;
                if (page === 1) {
                    this.popularTVList = data.results;
                } else {
                    this.popularTVList.push(...data.results);
                }
                return data;
            }),
        );
    };
}

export const tvStore = new TVStore();
