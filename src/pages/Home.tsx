import React from 'react';
import HeroSlide from '../component/hero-slide/HeroSlide';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../component/button/Button';
import MovieList from '../component/movie-list/MovieList';
import { TCategoryItem } from '../types';
import { observer } from 'mobx-react';

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

const categoryPage: Array<TCategoryItem> = [
    { title: 'Trending Movies', category: 'movie', listType: 'popular' },
    { title: 'Top Rated Movies', category: 'movie', listType: 'top_rated' },
    { title: 'Trending TV', category: 'tv', listType: 'popular' },
    { title: 'Top Rated TV', category: 'tv', listType: 'top_rated' },
];

const Home = () => {
    return (
        <>
            <HeroSlide />
            <div className="container">
                {categoryPage.map((item, idx) => {
                    const { category, listType, title } = item;

                    const link = 'catalog/' + category + '/' + listType;

                    return (
                        <div key={title + idx} className="section mb-3">
                            <div className="section__header mb-2">
                                <h2>{title}</h2>
                                <Link to={link}>
                                    <OutlineButton className="small">View More</OutlineButton>
                                </Link>
                            </div>
                            <MovieList category={category} listType={listType} />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default observer(Home);
