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
