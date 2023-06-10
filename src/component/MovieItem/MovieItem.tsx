import React, { FC } from 'react';
import { TMovie } from '../../types';

interface MovieItemProps {
    movie: TMovie;
}

export const MovieItem: FC<MovieItemProps> = ({ movie }) => {
    const { posterUrl, nameEn, nameRu, year, rating } = movie;
    return (
        <div className="movie">
            <img src={posterUrl} alt={nameRu} />
            <div className="movie__column">
                <h3 className="movie__title">{nameRu}</h3>
                <h5 className="movie__year">{year}</h5>
                <h5 className="movie__rating">{rating}</h5>
                <p className="movie__description"></p>
            </div>
        </div>
    );
};
