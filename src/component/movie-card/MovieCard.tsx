import { FC } from 'react';
import './MovieCard.scss';
import { Link } from 'react-router-dom';
import Button from '../button/Button';

import { TCategoryType } from '../../types';
import { TMovieItem } from '../../api/types';
import { observer } from 'mobx-react';

type MovieCardProps = {
    movieItem: TMovieItem;
    category: TCategoryType | undefined;
};

const MovieCard: FC<MovieCardProps> = ({ movieItem, category }) => {
    const link = '/' + category + '/' + movieItem.id;

    const bg = apiConfig.w500Image(movieItem.poster_path || movieItem.backdrop_path);

    const onClick = () => {};

    return (
        <Link to={link}>
            <div className="movie-card" style={{ backgroundImage: `url(${movie.image})` }}>
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
            </div>

            <h3>{movieItem.title}</h3>
        </Link>
    );
};

export default observer(MovieCard);
