import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../component/page-header/PageHeader';
import MovieGrid from '../component/movie-grid/MovieGrid';
import { TCategoryType } from '../types';
import { observer } from 'mobx-react-lite';

const Catalog = () => {
    const { category: categoryUrl } = useParams<{ category: TCategoryType }>();

    return (
        <>
            <PageHeader>{categoryUrl === 'movie' ? 'Mmovies' : 'TV Series'}</PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={categoryUrl} />
                </div>
            </div>
        </>
    );
};

export default observer(Catalog);
