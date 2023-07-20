import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import './MovieGrid.scss';
import { useStores } from '../../root-store-context';
import MovieCard from '../movie-card/MovieCard';

import { observer } from 'mobx-react';
import { OutlineButton } from '../button/Button';
import MovieSearch from '../movie-search/MovieSearch';
import { toJS } from 'mobx';
import { TCategoryType, TListType } from '../../api/types';
import { useNavigate, useParams } from 'react-router-dom';

type MovieGridProps = {
    category: TCategoryType | undefined;
    listType: TListType | undefined;
};

const MovieGrid: FC<MovieGridProps> = ({ category, listType }) => {
    const [page, setPage] = useState(1);
    const { moviesStore, tvStore } = useStores();
    const { keyword: keywordUrl } = useParams<{ keyword: string }>();
    const navigate = useNavigate();

    const {
        getMovieList,
        totalpagesMovieList,
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
        setKeyword,
    } = moviesStore;

    const { popularTVList, totalPagesTVList, getTVList, topTVList, dataPopularTVList, dataTopTVList } = tvStore;

    useEffect(() => {
        if (keywordUrl) {
            navigate(`/`);
        }
    }, []);

    useEffect(() => {
        if (keyword === '') {
            const params = { page: 1 };
            if (category === 'tv' && listType) getTVList(listType, { params });
            if (category === 'movie' && listType) getMovieList(listType, { params });
        } else {
            const params = {
                page: 1,
                query: keyword,
            };

            if (category) {
                searchMovie(category, { params });
            }
            if (listType === 'upcoming') {
                getMovieList(listType, { params });
                setKeyword('');
            }
        }
        return () => {
            setPage(1);
            if (listType) resetMoviesList(listType);
        };
    }, [category, listType]);

    useEffect(() => {
        setKeyword('');
    }, [category]);

    const loadMore = useCallback(() => {
        if (keyword === '') {
            const params = {
                page: page + 1,
            };
            if (category === 'movie' && listType) getMovieList(listType, { params });
            if (category === 'tv' && listType) getTVList(listType, { params });
        } else {
            const params = {
                page: page + 1,
                query: keyword,
            };
            if (category) {
                searchMovie(category, { params });
            }
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
                <span className="loader__text">Rejected upload - Enable vpn in browser</span>
            </div>
        );
    }

    if (listMovie.length === 0 && listTV.length === 0) {
        return (
            <div className="loader">
                <span className="loader__text">Загрузка ...</span>
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
                    </>
                )}
            </div>
            {page < (category === 'tv' ? totalPagesTVList : totalpagesMovieList) ? (
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
