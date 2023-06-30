import axios from 'axios';
import { TImdbComingSoonListResponse } from './types';

const IMDbApi = {
    imdbComingSoonList: () => axios.get<never, TImdbComingSoonListResponse>('https://imdb-api.com/en/API/ComingSoon/k_z54hd3u1'),
};

export default IMDbApi;