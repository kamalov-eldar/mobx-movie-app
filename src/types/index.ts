export type TGenre = {
    genre: string;
};

export type TMovie = {
    filmId: number;
    filmLength: string;
    nameEn: string;
    nameRu: string;
    posterUrl: string;
    rating: string;
    year: string;
    genres: TGenre[];
};

export interface MoviesResponse {
    films: TMovie[];
    pagesCount: number;
}
