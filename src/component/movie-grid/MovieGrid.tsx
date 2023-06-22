import React, { FC, useCallback, useEffect, useState } from 'react';
import './MovieGrid.scss';
import { useStores } from '../../root-store-context';
import MovieCard from '../movie-card/MovieCard';

import { observer } from 'mobx-react';
import { OutlineButton } from '../button/Button';
import MovieSearch from '../movie-search/MovieSearch';
import { TCategoryType } from '../../api/types';

type MovieGridProps = {
    category: TCategoryType;
};

const MovieGrid: FC<MovieGridProps> = ({ category }) => {
    const [page, setPage] = useState(1);

    const { moviesStore, tvStore } = useStores();

    const {
        getUpcomingMovieList,
        totalPagesUpcomingMovieList,

        keyword,
        searchMovie,
        getAwaitFilms,
        dataAwaitMoviesList,
    } = moviesStore;

    const { popularTVListLoadMore, totalPagesTVList, getPopularTVListLoadMore } = tvStore;

    useEffect(() => {
        if (keyword === '') {
            getAwaitFilms();
        } else {
            const params = {
                page: 1,
                query: keyword,
            };
            searchMovie(category, { params });
        }

        return function cleanup() {
            setPage(1);
        };
    }, []);

    const loadMore = useCallback(() => {
        if (keyword === '') {
            const params = {
                page: page + 1,
            };
            if (category === 'tv') getPopularTVListLoadMore('popular', { params });
            if (category === 'movie') getUpcomingMovieList('upcoming', { params });
        } else {
            const params = {
                page: page + 1,
                query: keyword,
            };
            searchMovie(category, { params });
        }
        setPage(page + 1);
    }, [page, category, keyword]);

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={category} /*keyword={keyword} */ />
            </div>

            <div className="movie-grid">
                {dataAwaitMoviesList?.case({
                    pending: () => (
                        <div className="loader">
                            <span className="loader__text">Загрузка...</span>
                        </div>
                    ),
                    rejected: () => <div className="loader">Error</div>,
                    fulfilled: ({ data }) => (
                        <>
                            {data.films.map((item) => (
                                <MovieCard movieItem={item} key={item.filmId} />
                            ))}
                        </>
                    ),
                })}
            </div>
            {page < (category === 'tv' ? totalPagesTVList : totalPagesUpcomingMovieList) ? (
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
