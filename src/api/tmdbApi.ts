import axios, { AxiosRequestConfig } from 'axios';
import axiosClient from './axiosClient';
import { TCategoryType, TListType } from '../types';
import { TResponseMovieList, TResponseTVList, TResponseVideosList } from './types';

const tmdbApi = {
    // https://api.themoviedb.org/3/movie/{'upcoming' | 'popular' | 'top_rated'}
    getMovieList: (ListType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        const url = 'movie/' + ListType;
        return axiosClient.get<never, TResponseMovieList>(url, params);
    },
    // https://api.themoviedb.org/3/tv/{'popular' | 'on_the_air' | 'top_rated'}
    getTvList: (ListType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        const url = 'tv/' + ListType;
        return axiosClient.get<never, TResponseTVList>(url, params);
    },
    // https://api.themoviedb.org/3/movie/:movieId/videos
    getVideos: (category: TCategoryType, id: number) => {
        const url = category + '/' + id + '/videos';
        return axiosClient.get<never, TResponseVideosList>(url, { params: {} });
    },
    search: (category: TCategoryType, params: AxiosRequestConfig<any> | undefined) => {
        const url = 'search/' + category;
        return axiosClient.get(url, params);
    },
    detail: (category: TCategoryType, id: number, params: AxiosRequestConfig<any> | undefined) => {
        const url = category + '/' + id;
        return axiosClient.get(url, params);
    },
    credits: (category: TCategoryType, id: number) => {
        const url = category + '/' + id + '/credits';
        return axiosClient.get(url, { params: {} });
    },
    similar: (category: TCategoryType, id: number) => {
        const url = category + '/' + id + '/similar';
        return axiosClient.get(url, { params: {} });
    },
};

export default tmdbApi;
