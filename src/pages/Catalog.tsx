import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PageHeader from '../component/page-header/PageHeader';
import MovieGrid from '../component/movie-grid/MovieGrid';

import { observer } from 'mobx-react';
import { useStores } from '../root-store-context';
import { TCategoryType, TListType } from '../api/types';

const Catalog = () => {
    const { category: categoryUrl, listType } = useParams<{ category: TCategoryType; listType: TListType }>();
    const { pathname } = useLocation();

    const arrNav = [
        {
            display: 'Home',
            path: '/',
        },
        {
            display: 'Upcoming Movies',
            path: '/catalog/movie/upcoming',
        },
        {
            display: 'Top Rated Movies',
            path: '/catalog/movie/top_rated',
        },
        {
            display: 'Trending Movies',
            path: '/catalog/movie/popular',
        },
        {
            display: 'TV Series Trending',
            path: '/catalog/tv/popular',
        },
        {
            display: 'Top Rated TV Series',
            path: '/catalog/tv/top_rated',
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
                    <MovieGrid category={categoryUrl} listType={listType} />
                </div>
            </div>
        </>
    );
};

export default Catalog;
