import { FC } from 'react';
import { TMovie } from '../../types';
import '../MovieItem/MovieItem.scss';

interface MovieItemProps {
    movie: TMovie;
}

export const MovieItem: FC<MovieItemProps> = ({ movie }) => {
    const { filmId, posterUrl, nameEn, nameRu, year, rating, genres } = movie;

    const genre = genres.map((item) => item.genre).join(', ');

    return (
        <div className="movie">
            <img src={posterUrl} alt={nameRu} />
            <div className="movie__column">
                <h3 className="movie__title">{nameRu}</h3>
                <div className="movie__genres">{genre}</div>
                <h5 className="movie__year">{year}</h5>
                <h5 className="movie__rating">{rating}</h5>
            </div>
        </div>
    );
};
