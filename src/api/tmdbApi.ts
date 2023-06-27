import axios, { AxiosRequestConfig } from 'axios';
import axiosClient from './axiosClient';
import { TCategoryType, TListType } from '../types';
import {
    TMovieDetail,
    TMovieItem,
    TResponseCastsList,
    TResponseMovieDetail,
    TResponseMovieList,
    TResponseVideosList,
} from './types';

const tmdbApi = {
    // https://api.themoviedb.org/3/movie/{'upcoming' | 'popular' | 'top_rated'}
    getMovieList: (listType: TListType, params: AxiosRequestConfig<any> | undefined, id?: number) => {
        const url = 'movie/' + (id ? `${id}/` : '') + listType;
        return axiosClient.get<never, TResponseMovieList>(url, params);
    },
    // https://api.themoviedb.org/3/tv/{'popular' | 'on_the_air' | 'top_rated'}
    getTvList: (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        const url = 'tv/' + listType;
        return axiosClient.get<never, any>(url, params);
        /*  return data.results.map((item) => {
            return {
                id: item.id,
                title: item.name,
                backdrop_path: item.backdrop_path,
                overview: item.overview,
                poster_path: item.poster_path,
            };
        }); */
    },
    // https://api.themoviedb.org/3/movie/:movieId/videos
    getVideos: (category: TCategoryType, id: number) => {
        const url = category + '/' + id + '/videos';
        return axiosClient.get<never, TResponseVideosList>(url, { params: {} });
    },
    search: (category: TCategoryType, params: AxiosRequestConfig<any> | undefined) => {
        const url = 'search/' + category;
        return axiosClient.get<never, TResponseMovieList>(url, params);
    },
    // https://api.themoviedb.org/3/search/keyword

    searchByKeyword: (keyword: string, params: AxiosRequestConfig<any> | undefined) => {
        const url = 'search/' + keyword;
        return axiosClient.get(url, params);
    },
    detail: (category: TCategoryType, id: number, params: AxiosRequestConfig<any> | undefined) => {
        const url = category + '/' + id;
        return axiosClient.get<never, TMovieDetail>(url, params);
    },
    credits: (category: TCategoryType, id: number) => {
        const url = category + '/' + id + '/credits';
        return axiosClient.get<never, TResponseCastsList>(url, { params: {} });
    },
    // https://api.themoviedb.org/3/movie/id/similar
    /* similar: (category: TCategoryType, id: number) => {
        const url = category + '/' + id + '/similar';
        return axiosClient.get(url, { params: {} });
    }, */
};

export default tmdbApi;
