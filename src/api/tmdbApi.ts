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

type TMovieType = 'upcoming' | 'popular' | 'top_rated';
type TTVType = 'popular' | 'on_the_air' | 'top_rated';
type TCategory = 'movie' | 'tv';

const tmdbApi = {
    getMoviesList: (
        movieType: TMovieType,
        params: AxiosRequestConfig<any> | undefined,
    ) => {
        const url = 'movie/' + movieType;
        return axiosClient.get(url, params);
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

export const fetchData = async (pageNumber = 1) =>
    (
        await axios.get(
            `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${pageNumber}`,
            {
                headers: {
                    'Content-Type': 'aplication/json',
                    'X-API-KEY': '8ccb0f71-adf6-4b8f-9927-980b4f08e9d5',
                },
            },
        )
    ).data;

export const fetchMovie = async (movieId = 927898) =>
    await axios.get(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}`,
        {
            headers: {
                'Content-Type': 'aplication/json',
                'X-API-KEY': '8ccb0f71-adf6-4b8f-9927-980b4f08e9d5',
            },
        },
    );

export default tmdbApi;
