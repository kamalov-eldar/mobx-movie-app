import axios, { AxiosRequestConfig } from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: 'https://kinopoiskapiunofficial.tech/api/v2.2/films/',
    headers: {
        'Content-Type': 'aplication/json',
        'X-API-KEY': '8ccb0f71-adf6-4b8f-9927-980b4f08e9d5',
    },
});

const kpApi = {
    getMovieList: (listType: TypeList, pageNumber: number) => {
        const url = `top?type=${listType}&page=${pageNumber}`;
        return axiosClient.get<never, TMovieListResponse>(url);
    },
};

export default kpApi;

export const fetchData = async (pageNumber = 1) =>
    (
        await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${pageNumber}`, {
            headers: {
                'Content-Type': 'aplication/json',
                'X-API-KEY': '8ccb0f71-adf6-4b8f-9927-980b4f08e9d5',
            },
        })
    ).data;

export const fetchMovie = async (movieId = 927898) =>
    await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}`, {
        headers: {
            'Content-Type': 'aplication/json',
            'X-API-KEY': '8ccb0f71-adf6-4b8f-9927-980b4f08e9d5',
        },
    });

export const fetchUpcomingMovie = async (movieId = 927898) =>
    await axios.get(`https://yts.mx/api/v2/list_upcoming.json`, {
        headers: {
            'Content-Type': 'aplication/json',
            'X-API-KEY': '8ccb0f71-adf6-4b8f-9927-980b4f08e9d5',
        },
    });
