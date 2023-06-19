import React from 'react';
import HeroSlide from '../component/hero-slide/HeroSlide';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../component/button/Button';
import MovieList from '../component/movie-list/MovieList';
import { TCategoryItem } from '../types';

/* const category = {
    categoryType: {
        movie: 'movie',
        tv: 'tv',
    },
    movieListType: {
        upcoming: 'upcoming',
        popular: 'popular',
        top_rated: 'top_rated',
    },
    TVListType: {
        popular: 'popular',
        top_rated: 'top_rated',
        on_the_air: 'on_the_air',
    },
}; */

const categoryArr: Array<TCategoryItem> = [
    {
        movie: 'movie',
        listType: 'popular',
    },
    {
        movie: 'movie',
        listType: 'top_rated',
    },
    {
        movie: 'tv',
        listType: 'popular',
    },
    {
        movie: 'tv',
        listType: 'top_rated',
    },
];

const Home = () => {
    const onClick = () => {};
    return (
        <>
            <HeroSlide />
            <div className="container">
                {categoryArr.map((category) => (
                    <div className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>Trending Movies</h2>
                            <Link to="/movie">
                                <OutlineButton className="small" onClick={onClick}>
                                    View More
                                </OutlineButton>
                            </Link>
                        </div>
                        <MovieList category={category.movie} listType={category.listType} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
