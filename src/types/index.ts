//export type TListMovieType = 'upcoming' | 'popular' | 'top_rated';
//export type TListTVType = 'popular' | 'on_the_air' | 'top_rated';
export type TListType = 'popular' | 'top_rated' | 'upcoming' | 'similar';
export type TCategoryType = 'movie' | 'tv';

export type TCategoryItem = {
    title: string;
    category: TCategoryType;
    listType: TListType;
};

export type TGenre = {
    genre: string;
};

export type TMovieKP = {
    filmId: number;
    filmLength: string;
    nameEn: string;
    nameRu: string;
    posterUrl: string;
    rating: string;
    year: string;
    genres: TGenre[];
};

export interface IMoviesResponseKP {
    films: TMovieKP[];
    pagesCount: number;
}
