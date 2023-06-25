import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../component/page-header/PageHeader';
import MovieGrid from '../component/movie-grid/MovieGrid';
import { TCategoryType, TListType } from '../types';
import { observer } from 'mobx-react';

const Catalog = () => {
    const { category: categoryUrl, listType } = useParams<{ category: TCategoryType; listType: TListType }>();
    console.log('listType-Catalog: ', listType);

    return (
        <>
            <PageHeader>{categoryUrl === 'movie' ? 'Upcoming Movies' : 'TV Series'}</PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={categoryUrl} listType={listType} />
                </div>
            </div>
        </>
    );
};

export default Catalog;
