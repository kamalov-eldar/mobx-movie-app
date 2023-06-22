export type TMovieItem = {
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

export type Genre = {
    name: string;
};

export type TMovieDetail = {
    adult: boolean;
    backdrop_path: string;
    genres: Array<Genre>;
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

export type TItemTV = {
    title: string;
    backdrop_path: string;
    first_air_date: string;
    genre_ids: Array<number>;
    id: number;
    name: string;
    origin_country: Array<string>;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
};

export type TVideo = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
};

export type TCast = {
    profile_path: string;
    name: string;
};

export interface TResponseMovieList {
    results: TMovieItem[];
    total_pages: number;
}
export interface TResponseMovieDetail {
    result: TMovieDetail;
}
export interface TResponseVideosList {
    results: TVideo[];
    id: number;
}
export interface TResponseTVList {
    results: TItemTV[];
    page: number;
    total_pages: number;
}

export interface TResponseCastsList {
    cast: TCast[];
}
