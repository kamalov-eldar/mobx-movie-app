import { FC } from 'react';
import './MovieCard.scss';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import { TMovie } from '../../api/types';
import { observer } from 'mobx-react';

type MovieCardProps = {
    movie: TMovie;
};

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
    const link = '/' + 'movie' + '/' + movie.id;

    return (
        <Link to={link}>
            <div className="movie-card" style={{ backgroundImage: `url(${movie.image})` }}>
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
            </div>
            <h3>{movie.name}</h3>
        </Link>
    );
};

export default observer(MovieCard);
