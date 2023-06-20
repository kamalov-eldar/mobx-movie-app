import React, { FC, useEffect, useState } from 'react';
import './MovieGrid.scss';
import { useStores } from '../../root-store-context';
import MovieCard from '../movie-card/MovieCard';
import { TCategoryType } from '../../types';
import { observer } from 'mobx-react';

type MovieGridProps = {
    category: TCategoryType;
};

const MovieGrid: FC<MovieGridProps> = ({ category }) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const { moviesStore, tvStore } = useStores();
    const { dataPopularMovieList, dataTopMovieList, getPopularMovieList, getTopMovieList } = moviesStore;
    const { dataTopTVList, dataPopularTVList, getPopularTVList, getTopTVList } = tvStore;

    useEffect(() => {}, []);

    return (
        <div>
            <div className="movie-grid">
                {category === 'movie'
                    ? dataPopularMovieList?.case({
                          pending: () => (
                              <div className="loader">
                                  <span className="loader__text">Загрузка...</span>
                              </div>
                          ),
                          rejected: () => <div>Error</div>,
                          fulfilled: (list) => (
                              <>
                                  {list.results.map((item, i) => (
                                      <MovieCard category={category} movieItem={item} key={i} />
                                  ))}
                              </>
                          ),
                      })
                    : dataPopularTVList?.case({
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
                      })}
            </div>
        </div>
    );
};

export default observer(MovieGrid);
