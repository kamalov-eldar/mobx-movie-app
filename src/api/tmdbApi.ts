import axios, { AxiosRequestConfig } from 'axios';
import axiosClient from './axiosClient';
import {
    TCategoryType,
    TListType,
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
    getUpcomingMovieList: (params: AxiosRequestConfig<any> | undefined) => {
        const url = 'https://api.themoviedb.org/3/movie/upcoming';
        return axiosClient.get<never, TResponseMovieList>(url, params);
    },

    // https://api.themoviedb.org/3/tv/{'popular' | 'on_the_air' | 'top_rated'}
    getTvList: async (listType: TListType, params: AxiosRequestConfig<any> | undefined) => {
        const url = 'tv/' + listType;
        const data = await axiosClient.get<never, TResponseMovieList>(url, params);
        return {
            ...data,
            results: data.results.map((item: any) => {
                return {
                    id: item.id,
                    title: item.name,
                    backdrop_path: item.backdrop_path,
                    overview: item.overview,
                    poster_path: item.poster_path,
                };
            }),
        };
    },
    // https://api.themoviedb.org/3/movie/:movieId/videos
    getVideos: (category: TCategoryType, id: number) => {
        const url = category + '/' + id + '/videos';
        return axiosClient.get<never, TResponseVideosList>(url, { params: {} });
    },
    // https://api.themoviedb.org/3/search/movie?query=man
    // `api/movies/search?query=${debouncedSearchTerm.value}&page=${page.value}`;
    // `api/vacansies/search?query=`;
    // const { data } = await useFetch<ApiResponse>(url)
    // const apiBaseUrl = https://api.themoviedb.org/3/
    // $fetch(`${config.apiBaseUrl}/search/movie?query=${query}&page=${page}&include_adult=false`,
    search: async (category: TCategoryType, params: AxiosRequestConfig<any> | undefined) => {
        const url = 'search/' + category;
        const data = await axiosClient.get<never, TResponseMovieList>(url, params);
        return {
            ...data,
            results: data.results.map((item: any) => {
                return {
                    id: item.id,
                    title: category === 'movie' ? item.title : item.name,
                    backdrop_path: item.backdrop_path,
                    overview: item.overview,
                    poster_path: item.poster_path,
                };
            }),
        };
    },
    // https://api.themoviedb.org/3/search/keyword

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
