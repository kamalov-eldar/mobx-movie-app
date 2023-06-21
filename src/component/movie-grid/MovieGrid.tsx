import React, { FC, useCallback, useEffect, useState } from 'react';
import './MovieGrid.scss';
import { useStores } from '../../root-store-context';
import MovieCard from '../movie-card/MovieCard';
import { TCategoryType } from '../../types';
import { observer } from 'mobx-react';
import { OutlineButton } from '../button/Button';
import MovieSearch from '../movie-search/MovieSearch';

type MovieGridProps = {
    category: TCategoryType;
};

const MovieGrid: FC<MovieGridProps> = ({ category }) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { moviesStore, tvStore } = useStores();

    const { getUpcomingMovieList, totalPagesUpcomingMovieList, upcomingMovieList, keyword, searchMovie } = moviesStore;

    const { popularTVListLoadMore, totalPagesTVList, getPopularTVListLoadMore } = tvStore;

    useEffect(() => {
        if (keyword === '') {
            const params = { page: 1, language: 'ru-RU' };
            if (category === 'tv') getPopularTVListLoadMore('popular', { params });
            if (category === 'movie') getUpcomingMovieList('upcoming', { params });
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
    }, [category]);

    const loadMore = useCallback(() => {

        if (keyword === '') {
            const params = {
                page: page + 1,
                language: 'ru-RU',
            };
            if (category === 'tv') getPopularTVListLoadMore('popular', { params });
            if (category === 'movie') getUpcomingMovieList('upcoming', { params });
        } else {
            console.log('keyword: ', keyword);

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
                {category === 'movie' ? (
                    <>
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
