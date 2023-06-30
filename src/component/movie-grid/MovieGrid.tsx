import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import './MovieGrid.scss';
import { useStores } from '../../root-store-context';
import MovieCard from '../movie-card/MovieCard';
import { TCategoryType, TListType } from '../../types';
import { observer } from 'mobx-react';
import { OutlineButton } from '../button/Button';
import MovieSearch from '../movie-search/MovieSearch';
import RejectUpload from '../reject-upload/RejectUpload';
import { toJS } from 'mobx';

type MovieGridProps = {
    category: TCategoryType | undefined;
    listType: TListType | undefined;
};

const MovieGrid: FC<MovieGridProps> = ({ category, listType }) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { moviesStore, tvStore } = useStores();

    const {
        getMovieList,
        totalpages,
        upcomingMovieList,
        dataUpcomingMovieList,
        popularMovieList,
        dataPopularMovieList,
        dataTopMovieList,
        topMovieList,
        keyword,
        searchMovie,
        resetMoviesList,
        searchList,
    } = moviesStore;

    const { popularTVList, totalPagesTVList, getTVList, topTVList, dataPopularTVList, dataTopTVList } = tvStore;

    useEffect(() => {
        if (keyword === '') {
            const params = { page: 1 };
            if (category === 'tv') getTVList('popular', { params });
            if (category === 'movie' && listType) getMovieList(listType, { params });
        } else {
            const params = {
                page: 1,
                query: keyword,
            };
            if (category) searchMovie(category, { params });
        }

        return function cleanup() {
            setPage(1);
            if (listType) resetMoviesList(listType);
        };
    }, [category, listType]);

    const loadMore = useCallback(() => {
        if (keyword === '') {
            const params = {
                page: page + 1,
            };
            if (category === 'movie' && listType) getMovieList(listType, { params });
            if (category === 'tv') getTVList('popular', { params });
        } else {
            const params = {
                page: page + 1,
                query: keyword,
            };
            if (category) searchMovie(category, { params });
        }
        setPage(page + 1);
    }, [page, category, keyword, listType]);

    const listMovie = useMemo(() => {
        switch (listType) {
            case 'popular':
                return popularMovieList;
            case 'top_rated':
                return topMovieList;
            case 'upcoming':
                return upcomingMovieList;

            default:
                return searchList;
        }
    }, [listType, popularMovieList, topMovieList, upcomingMovieList, searchList]);

    const listTV = useMemo(() => {
        switch (listType) {
            case 'popular':
                return popularTVList;
            case 'top_rated':
                return topTVList;
            default:
                return searchList;
        }
    }, [listType, popularTVList, topTVList, searchList]);

    const dataMovieList = useMemo(() => {
        switch (listType) {
            case 'popular':
                return dataPopularMovieList;
            case 'top_rated':
                return dataTopMovieList;
            case 'upcoming':
                return dataUpcomingMovieList;

            default:
                return undefined;
        }
    }, [listType, dataPopularMovieList, dataTopMovieList, dataUpcomingMovieList]);

    const dataTVList = useMemo(() => {
        switch (listType) {
            case 'popular':
                return dataPopularTVList;
            case 'top_rated':
                return dataTopTVList;

            default:
                return undefined;
        }
    }, [listType, dataPopularTVList, dataTopTVList]);

    if ((dataTVList?.state || dataMovieList?.state) === 'rejected') {
        return (
            <div className="loader">
                <span className="loader__text">
                    rejected MovieGrid {category}-{listType}...
                </span>
            </div>
        );
    }

    if (listMovie.length === 0 && listTV.length === 0) {
        return (
            <div className="loader">
                <span className="loader__text">
                    Загрузка MovieGrid {category}-{listType}...
                </span>
            </div>
        );
    }

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={category} />
            </div>

            <div className="movie-grid">
                {category === 'movie' && (
                    <>
                        {/*  {listType === 'popular' &&
                            popularMovieList.map((item, i) => <MovieCard category={category} movieItem={item} key={item.id} />)}
                        {listType === 'top_rated' &&
                            topMovieList.map((item, i) => <MovieCard category={category} movieItem={item} key={item.id} />)}
                        {upcomingMovieList.map((item, i) => (
                            <MovieCard category={category} movieItem={item} key={item.id} />
                        ))} */}
                        {listMovie.map((item, i) => (
                            <MovieCard category={category} movieItem={item} key={item.id} />
                        ))}
                    </>
                )}
                {category === 'tv' && (
                    <>
                        {listTV.map((item, i) => {
                            return <MovieCard category={category} movieItem={item} key={item.id} />;
                        })}
                        {/* {searchList.map((item, i) => (
                            <MovieCard category={category} movieItem={item} key={item.id} />
                        ))} */}
                    </>
                )}
            </div>
            {page < (category === 'tv' ? totalPagesTVList : totalpages) ? (
                <div className="movie-grid__loadmore">
                    <OutlineButton className="small" onClick={loadMore}>
                        Load more
                    </OutlineButton>
                </div>
            ) : null}
        </>
    );
};

export default observer(MovieGrid);

{
    /*  {data?.case({
                pending: () => {
                    console.log('pending: ');
                    return (
                        <div className="loader">
                            <span className="loader__text">Загрузка...</span>
                        </div>
                    );
                },
                rejected: () => <div className="loader">rejected</div>,
                fulfilled: () => {
                    console.log('fulfilled: ');
                    return <></>;
                },
            })} */
}
