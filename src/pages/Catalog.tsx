import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PageHeader from '../component/page-header/PageHeader';
import MovieGrid from '../component/movie-grid/MovieGrid';
import { TCategoryType, TListType } from '../types';
import { observer } from 'mobx-react';
import { useStores } from '../root-store-context';

const Catalog = () => {
    const { category: categoryUrl, listType } = useParams<{ category: TCategoryType; listType: TListType }>();
    const { pathname } = useLocation();

    const { moviesStore, tvStore } = useStores();

    const { dataPopularMovieList, dataTopMovieList } = moviesStore;

    const arrNav = [
        {
            display: 'Home',
            path: '/',
        },
        {
            display: 'Upcoming Movies',
            path: '/movie/upcoming',
        },
        {
            display: 'Top Rated Movies',
            path: '/movie/top_rated',
        },
        {
            display: 'Trending Movies',
            path: '/movie/popular',
        },
        {
            display: 'TV Series',
            path: '/tv',
        },
    ];

    const headerTitle = arrNav.find((item) => {
        return item.path === pathname;
    });

    return (
        <>
            <PageHeader title={headerTitle?.display} />
            <div className="container">
                <div className="section mb-3">
                    {/* {(dataPopularMovieList || dataTopMovieList)?.case({
                        pending: () => (
                            <div className="loader">
                                <span className="loader__text">Загрузка...</span>
                            </div>
                        ),
                        rejected: () => <div>Error</div>,
                        fulfilled: (list) => (
                            <>
                                <MovieGrid category={categoryUrl} listType={listType} />
                            </>
                        ),
                    })} */}
                    <MovieGrid category={categoryUrl} listType={listType} />
                </div>
            </div>
        </>
    );
};

export default Catalog;
