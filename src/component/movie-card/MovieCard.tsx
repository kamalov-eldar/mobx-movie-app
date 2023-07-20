import { FC, useEffect, useState } from 'react';

import './MovieCard.scss';
import { Link } from 'react-router-dom';
import Button from '../button/Button';

import { TCategoryType } from '../../api/types';
import { TMovieItem } from '../../api/types';
import { observer } from 'mobx-react';
import apiConfig from '../../api/apiConfig';
import { IMG } from './IMG';
//import Skeleton from './Skeleton';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

type MovieCardProps = {
    movieItem: TMovieItem;
    category: TCategoryType | undefined;
};

const MovieCard: FC<MovieCardProps> = ({ movieItem, category }) => {
    const link = '/' + category + '/' + movieItem.id;

    const bg = apiConfig.w185Image(movieItem.poster_path || movieItem.backdrop_path);

    return (
        <Link to={link} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className="movie-card">
                <IMG path={movieItem.poster_path || movieItem.backdrop_path} />
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
            </div>
            <h3>{movieItem.title}</h3>
        </Link>
    );
};

export default observer(MovieCard);
