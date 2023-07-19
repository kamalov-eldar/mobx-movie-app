import { TMovieItem, TResponseMovieList } from '../api/types';
import { makeObservable, observable } from 'mobx';
import { TListType } from '../api/types';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import tmdbApi from '../api/tmdbApi';
import { AxiosRequestConfig } from 'axios';

class TVStore {
    dataPopularTVList?: IPromiseBasedObservable<TResponseMovieList>;
    dataTopTVList?: IPromiseBasedObservable<TResponseMovieList>;

    /*****/
    popularTVList: TMovieItem[] = [];
    topTVList: TMovieItem[] = [];
    totalPagesTVList: number = 0;

    constructor() {
        makeObservable(this, {
            dataPopularTVList: observable,
            dataTopTVList: observable,
            topTVList: observable,
            popularTVList: observable,
            totalPagesTVList: observable,
        });
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
                        this.totalPagesTVList = data.total_pages;
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
                        this.totalPagesTVList = data.total_pages;
                        return data;
                    }),
                );
                break;
            default:
                break;
        }
    };
}

export const tvStore = new TVStore();
