import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import './MovieGrid.scss';
import { useStores } from '../../root-store-context';
import MovieCard from '../movie-card/MovieCard';
import { TCategoryType, TListType } from '../../types';
import { observer } from 'mobx-react';
import { OutlineButton } from '../button/Button';
import MovieSearch from '../movie-search/MovieSearch';
import { useRouteMatch } from 'react-router-dom';

type MovieGridProps = {
    category: TCategoryType;
    listType: TListType;
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
    } = moviesStore;

    const { popularTVListLoadMore, totalPagesTVList, getPopularTVListLoadMore } = tvStore;

    useEffect(() => {
        if (keyword === '') {
            const params = { page: 1 };
            if (category === 'tv') getPopularTVListLoadMore('popular', { params });
            //  if (category === 'movie') getUpcomingMovieList('upcoming', { params });
            if (category === 'movie') getMovieList(listType, { params });
        } else {
            const params = {
                page: 1,
                query: keyword,
            };
            searchMovie(category, { params });
        }

        return function cleanup() {
            console.log('cleanup: ');
            setPage(1);
            resetMoviesList(listType);
        };
    }, [category, listType]);

    const loadMore = useCallback(() => {
        if (keyword === '') {
            const params = {
                page: page + 1,
            };
            if (category === 'tv') getPopularTVListLoadMore('popular', { params });
            //  if (category === 'movie') getUpcomingMovieList('upcoming', { params });
            if (category === 'movie') getMovieList(listType, { params });
        } else {
            console.log('keyword: ', keyword);

            const params = {
                page: page + 1,
                query: keyword,
            };
            searchMovie(category, { params });
        }
        setPage(page + 1);
    }, [page, category, keyword, listType]);

    const list = useMemo(() => {
        switch (listType) {
            case 'popular':
                return popularMovieList;
            case 'top_rated':
                return topMovieList;
            case 'upcoming':
                return upcomingMovieList;

            default:
                return [];
        }
    }, [listType, popularMovieList, topMovieList, upcomingMovieList]);

    const data = useMemo(() => {
        switch (listType) {
            case 'popular':
                return dataPopularMovieList;
            case 'top_rated':
                return dataTopMovieList;
            case 'upcoming':
                return dataUpcomingMovieList;

            default:
                return;
        }
    }, [listType, dataPopularMovieList, dataTopMovieList, dataUpcomingMovieList]);

    if (list.length === 0) {
        return (
            <div className="loader">
                <span className="loader__text">Загрузка MovieGrid...</span>
            </div>
        );
    }
    if (data?.state === 'rejected') {
        return <div className="loader">rejected MovieGrid</div>;
    }

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={category} /*keyword={keyword} */ />
            </div>

            <div className="movie-grid">
                {category === 'movie' ? (
                    <>
                        {listType === 'popular' &&
                            popularMovieList.map((item, i) => <MovieCard category={category} movieItem={item} key={item.id} />)}
                        {listType === 'top_rated' &&
                            topMovieList.map((item, i) => <MovieCard category={category} movieItem={item} key={item.id} />)}
                        {upcomingMovieList.map((item, i) => (
                            <MovieCard category={category} movieItem={item} key={item.id} />
                        ))}
                    </>
                ) : (
                    <>
                        {popularTVListLoadMore.map((item, i) => (
                            <MovieCard category={category} tvItem={item} key={item.id} />
                        ))}
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
