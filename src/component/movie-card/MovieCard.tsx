import React, { FC } from 'react';
import './MovieCard.scss';
import apiConfig from '../../api/apiConfig';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import { TMovie } from '../../api/types';
import { observer } from 'mobx-react';

type MovieCardProps = {
    movieItem: TMovie;
};

const MovieCard: FC<MovieCardProps> = ({ movieItem }) => {
    const link = '/' + 'movie' + '/' + movieItem.filmId;

    return (
        <Link to={link}>
            <div className="movie-card" style={{ backgroundImage: `url(${movieItem.posterUrlPreview})` }}>
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
            </div>
            <h3>{movieItem.nameRu}</h3>
        </Link>
    );
};

export default observer(MovieCard);
