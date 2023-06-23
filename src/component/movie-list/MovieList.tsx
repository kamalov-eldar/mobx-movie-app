import { FC, useEffect, useState } from 'react';
import './MovieList.scss';
import tmdbApi from '../../api/tmdbApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiConfig from '../../api/apiConfig';
import { TCategoryType, TItemTV, TListType, TMovieItem } from '../../api/types';
import { useStores } from '../../root-store-context';
import { observer } from 'mobx-react';
import MovieCard from '../movie-card/MovieCard';

type MovieListProps = {
    category: TCategoryType;
    listType: TListType;
    id?: number;
};

const MovieList: FC<MovieListProps> = ({ category, listType, id }) => {
    const { moviesStore } = useStores();
    const { dataTop100MovieList, top100MovieList, getTop100 } = moviesStore;

    useEffect(() => {
        const params = { page: 1 };
        getTop100();
    }, []);

    if (!dataTop100MovieList) {
        return <div className="loader">No Data</div>;
    }

    /* if (!dataTopMovieList) {
        return <div>No Data</div>;
    } */

    return (
        <div className="movie-list">
            {dataTop100MovieList.case({
                pending: () => (
                    <div className="loader">
                        <span className="loader__text">Загрузка...</span>
                    </div>
                ),
                rejected: () => <div className="loader">Error</div>,
                fulfilled: () => (
                    <Swiper
                        // modules={[Autoplay]}
                        grabCursor={true}
                        spaceBetween={10}
                        slidesPerView={'auto'}
                        // autoplay={{ delay: 3000 }}
                    >
                        {top100MovieList.map((item, i) => (
                            <SwiperSlide key={i}>
                                <MovieCard movie={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ),
            })}
        </div>
    );
};

export default observer(MovieList);
