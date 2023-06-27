import {  TMovieItem, TResponseMovieList, TResponseTVList } from '../api/types';
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
    popularTVList: TMovieItem[] = [];
    topTVList: TMovieItem[] = [];

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
        // if(listType === 'popular')

        listType === 'popular'
            ? this.dataPopularTVList
            : (this.dataTopTVList = fromPromise(
                  tmdbApi.getTvList(listType, params).then((data) => {
                      const dataResult = data.results.map((item: any) => {
                          return {
                              id: item.id,
                              title: item.name,
                              backdrop_path: item.backdrop_path,
                              overview: item.overview,
                              poster_path: item.poster_path,
                          };
                      });
                      const { page } = params?.params;
                      if (page === 1) {
                          this.popularTVList = dataResult;
                      } else {
                          this.popularTVList.push(...dataResult);
                      }
                      return data;
                  }),
              ));

        /*  switch (listType) {
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
        } */
    };
}

export const tvStore = new TVStore();
