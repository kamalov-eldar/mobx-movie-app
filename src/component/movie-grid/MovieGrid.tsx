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
        getImdbComingSoonList,
        imdbComingSoonList,
        dataImdbComingSoonList,
        totalPagesUpcomingMovieList,
        keyword,
        searchMovie,
    } = moviesStore;

    const { popularTVListLoadMore, totalPagesTVList, getPopularTVListLoadMore } = tvStore;


    useEffect(() => {
        getImdbComingSoonList();
        /*  if (keyword === '') {
        } else {
            const params = {
                page: 1,
                query: keyword,
            };
            searchMovie(category, { params });
        } */

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
            if (category === 'movie') getUpcomingMovieList({ params });
        } else {
            const params = {
                page: page + 1,
                query: keyword,
            };
            searchMovie(category, { params });
        }
        setPage(page + 1);
    }, [page, category, keyword]);

    if (!dataImdbComingSoonList) {
        return <div className="loader">No Data</div>;
    }

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={category} /*keyword={keyword} */ />
            </div>

            {/*  <div className="movie-grid"> */}
            {dataImdbComingSoonList?.case({
                pending: () => (
                    <div className="loader">
                        <span className="loader__text">Загрузка...</span>
                    </div>
                ),
                rejected: () => <div className="loader">Error</div>,
                fulfilled: () => (
                    <div className="movie-grid">
                        {imdbComingSoonList.map((item) => (
                            <MovieCard movie={item} /* movieItem={item} */ key={item.id} />
                        ))}
                    </div>
                ),
            })}
            {/*  </div> */}
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
