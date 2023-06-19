import { TMovieItem, TResponseMovieList, TResponseTVList } from '../api/types';
import { makeAutoObservable, makeObservable, observable } from 'mobx';
import { IMoviesResponseKP, TListType, TMovieKP } from '../types';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { fetchData, fetchMovie } from '../api/apiKinopoisk';
import tmdbApi from '../api/tmdbApi';
import { AxiosRequestConfig } from 'axios';

class TVStore {
    dataPopularTVList?: IPromiseBasedObservable<TResponseTVList>;
    dataTopTVList?: IPromiseBasedObservable<TResponseTVList>;

    constructor() {
        makeObservable(this, {
            dataPopularTVList: observable,
            dataTopTVList: observable,
        });
    }

    getPopularTVList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        this.dataPopularTVList = fromPromise(tmdbApi.getTvList(listType, params).then((data) => data));
    };
    getTopTVList = (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        this.dataTopTVList = fromPromise(tmdbApi.getTvList(listType, params).then((data) => data));
    };
}

export const tvStore = new TVStore();
