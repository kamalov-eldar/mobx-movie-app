import React, { FC } from 'react';
import { TMovie } from '../types';

interface MovieItemProps {
    movie: TMovie;
}

export const MovieItem: FC<MovieItemProps> = ({ movie }) => {
    return <div>MovieItem</div>;
};
