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

const category: Array<TCategoryItem> = [
    { title: 'Trending Movies', category: 'movie', listType: 'popular' },
    { title: 'Top Rated Movies', category: 'movie', listType: 'top_rated' },
    { title: 'Trending TV', category: 'tv', listType: 'popular' },
    { title: 'Top Rated TV', category: 'tv', listType: 'top_rated' },
];

const Home = () => {
    const onClick = () => {};
    return (
        <>
            <HeroSlide />
            <div className="container">
                {/* {category.map((category, idx) => (
                    <div key={category.title + idx} className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>{category.title}</h2>
                            <Link to="/movie">
                                <OutlineButton className="small" onClick={onClick}>
                                    View More
                                </OutlineButton>
                            </Link>
                        </div>
                        <MovieList category={category.category} listType={category.listType} />
                    </div>
                ))} */}

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>{category[0].title}</h2>
                        <Link to="/movie">
                            <OutlineButton className="small" onClick={onClick}>
                                View More
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category[0].category} listType={category[0].listType} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>{category[1].title}</h2>
                        <Link to="/movie">
                            <OutlineButton className="small" onClick={onClick}>
                                View More
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category[1].category} listType={category[1].listType} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>{category[2].title}</h2>
                        <Link to="/movie">
                            <OutlineButton className="small" onClick={onClick}>
                                View More
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category[2].category} listType={category[2].listType} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>{category[3].title}</h2>
                        <Link to="/movie">
                            <OutlineButton className="small" onClick={onClick}>
                                View More
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category[3].category} listType={category[3].listType} />
                </div>
            </div>
        </>
    );
};

export default observer(Home);
