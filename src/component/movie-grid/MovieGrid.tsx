import React, { FC, useEffect, useState } from 'react';
import './MovieGrid.scss';
import { useStores } from '../../root-store-context';
import MovieCard from '../movie-card/MovieCard';
import { TCategoryType } from '../../types';
import { observer } from 'mobx-react';
import { OutlineButton } from '../button/Button';

type MovieGridProps = {
    category: TCategoryType;
};

const MovieGrid: FC<MovieGridProps> = ({ category }) => {
    console.log('category: ', category);

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { moviesStore, tvStore } = useStores();

    const {
        dataPopularMovieList,
        dataTopMovieList,
        dataFutureMovieList,
        getPopularMovieList,
        getTopMovieList,
        getUpcomingMovieList,
        totalPagesMovieList,
        upcomingMovieList,
    } = moviesStore;
    const { dataTopTVList, dataPopularTVList, getPopularTVList, getTopTVList } = tvStore;

    useEffect(() => {
        const params = { page: 1, language: 'ru-RU' };
        //                     getPopularMovieList(listType, { params });
        getUpcomingMovieList('upcoming', { params });
    }, []);

    const loadMore = (numberPage: number) => {
        const params = {
            page: numberPage,
            language: 'ru-RU',
        };
        getUpcomingMovieList('upcoming', { params });
    };

    return (
        <>
            <div className="movie-grid">
                {category === 'movie' ? (
                    /* dataFutureMovieList?.case({
                          pending: () => (
                              <div className="loader">
                                  <span className="loader__text">Загрузка...</span>
                              </div>
                          ),
                          rejected: () => <div>Error</div>,
                          fulfilled: (data) => {
                              return (
                                  <>
                                      {data.results.map((item, i) => (
                                          <MovieCard category={category} movieItem={item} key={i} />
                                      ))}
                                  </>
                              );
                          },
                      }) */
                    <>
                        {upcomingMovieList.map((item, i) => (
                            <MovieCard category={category} movieItem={item} key={i} />
                        ))}
                    </>
                ) : (
                    dataPopularTVList?.case({
                        pending: () => (
                            <div className="loader">
                                <span className="loader__text">Загрузка...</span>
                            </div>
                        ),
                        rejected: () => <div>Error</div>,
                        fulfilled: (list) => (
                            <>
                                {list.results.map((item, i) => (
                                    <MovieCard category={category} tvItem={item} key={i} />
                                ))}
                            </>
                        ),
                    })
                )}
            </div>
            {page < totalPagesMovieList ? (
                <div className="movie-grid__loadmore">
                    <OutlineButton className="small" onClick={() => loadMore(2)}>
                        Load more
                    </OutlineButton>
                </div>
            ) : null}
        </>
    );
};

export default observer(MovieGrid);
