import axios, { AxiosRequestConfig } from 'axios';
import axiosClient from './axiosClient';

/* export const category = {
    movie: 'movie',
    tv: 'tv',
}; */

/* export const movieType: TMovieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated',
}; */

/* export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air',
}; */

export type TResponseMovie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: false;
    vote_average: number;
    vote_count: number;
};

export interface TResponseMovieList {
    results: TResponseMovie[];
}

type TMovieType = 'upcoming' | 'popular' | 'top_rated';
type TTVType = 'popular' | 'on_the_air' | 'top_rated';
type TCategory = 'movie' | 'tv';

const tmdbApi = {
    getMoviesList: (
        movieType: TMovieType,
        params: AxiosRequestConfig<any> | undefined,
    ) => {
        console.log('getMoviesList: ');

        const url = 'movie/' + movieType;
        return axiosClient.get<never, TResponseMovieList>(url, params);
    },
    getTvList: (
        tvType: TTVType,
        params: AxiosRequestConfig<any> | undefined,
    ) => {
        const url = 'tv/' + tvType;
        return axiosClient.get(url, params);
    },
    getVideos: (category: TCategory, id: number) => {
        const url = category + '/' + id + '/videos';
        return axiosClient.get(url, { params: {} });
    },
    search: (
        category: TCategory,
        params: AxiosRequestConfig<any> | undefined,
    ) => {
        const url = 'search/' + category;
        return axiosClient.get(url, params);
    },
    detail: (
        category: TCategory,
        id: number,
        params: AxiosRequestConfig<any> | undefined,
    ) => {
        const url = category + '/' + id;
        return axiosClient.get(url, params);
    },
    credits: (category: TCategory, id: number) => {
        const url = category + '/' + id + '/credits';
        return axiosClient.get(url, { params: {} });
    },
    similar: (category: TCategory, id: number) => {
        const url = category + '/' + id + '/similar';
        return axiosClient.get(url, { params: {} });
    },
};

export default tmdbApi;
