import React, { FC } from 'react';
import './MovieCard.scss';
import apiConfig from '../../api/apiConfig';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import { TCategoryType } from '../../types';
import { TItemTV, TMovieItem } from '../../api/types';

type MovieCardProps = {
    movieItem?: TMovieItem;
    tvItem?: TItemTV;
    category: TCategoryType;
};

const MovieCard: FC<MovieCardProps> = ({ tvItem, movieItem, category }) => {
    //const item = tvItem || movieItem;

    const link = '/' + category + '/' + (tvItem || movieItem)?.id;

    const bg = apiConfig.w500Image((tvItem || movieItem)!.poster_path || (tvItem || movieItem)!.backdrop_path);
    const onClick = () => {};

    return (
        <Link to={link}>
            <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
                <Button onClick={onClick}>
                    <i className="bx bx-play"></i>
                </Button>
                {/*  <h3>{item?.title || item?.name} </h3> */}
            </div>
            {tvItem && <h3>{(tvItem || movieItem).name}</h3>}
            {movieItem && <h3>{(tvItem || movieItem).title}</h3>}
        </Link>
    );
};

export default MovieCard;
