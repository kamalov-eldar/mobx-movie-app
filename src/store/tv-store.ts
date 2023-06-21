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
    popularTVListLoadMore: TItemTV[] = [];

    constructor() {
        makeObservable(this, {
            dataPopularTVList: observable,
            dataTopTVList: observable,

            totalPagesTVList: computed,
            topTVList: computed,
        });
    }

    get totalPagesTVList() {
        if (this.dataPopularTVList?.state === 'fulfilled') return this.dataPopularTVList.value.total_pages;
        return 0;
    }

    get topTVList() {
        if (this.dataTopTVList?.state === 'fulfilled') return this.dataTopTVList.value.results;
        return [];
    }

    getPopularTVList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        this.dataPopularTVList = fromPromise(tmdbApi.getTvList(listType, params).then((data) => data));
    };

    getTopTVList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        this.dataTopTVList = fromPromise(tmdbApi.getTvList(listType, params).then((data) => data));
    };

    ////////////////////

    getPopularTVListLoadMore = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        this.dataPopularTVList = fromPromise(
            tmdbApi.getTvList(listType, params).then((data) => {
                const { page } = params?.params;
                if (page === 1) {
                    this.popularTVListLoadMore = data.results;
                } else {
                    this.popularTVListLoadMore.push(...data.results);
                }
                return data;
            }),
        );
    };
}

export const tvStore = new TVStore();
