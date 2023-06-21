import { FC, useEffect, useState } from 'react';
import { TCategoryType, TListType } from '../../types';
import './MovieList.scss';
import tmdbApi from '../../api/tmdbApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiConfig from '../../api/apiConfig';
import { TItemTV, TMovieItem } from '../../api/types';
import { useStores } from '../../root-store-context';
import { observer } from 'mobx-react';
import MovieCard from '../movie-card/MovieCard';

type MovieListProps = {
    category: TCategoryType;
    listType: TListType;
};

const MovieList: FC<MovieListProps> = ({ category, listType }) => {
    /*  console.log('listType: ', listType);
    console.log('category: ', category); */
    const { moviesStore, tvStore } = useStores();
    const { dataPopularMovieList, dataTopMovieList, getPopularMovieList, getTopMovieList } = moviesStore;
    const { dataTopTVList, dataPopularTVList, getPopularTVList, getTopTVList } = tvStore;

    useEffect(() => {
        switch (category) {
            case 'movie':
                if (listType === 'popular') {
                    getPopularMovieList(listType, { params });
                }
                if (listType === 'top_rated') {
                    getTopMovieList(listType, { params });
                }
                break;

            case 'tv':
                if (listType === 'popular') {
                    getPopularTVList(listType, { params });
                }
                if (listType === 'top_rated') {
                    getTopTVList(listType, { params });
                }
                break;
        }
    }, []);

    const params = { page: 1, language: 'ru-RU' };

    /*  if (!dataPopularMovieList) {
        return <div>No Data</div>;
    } */

    /* if (!dataTopMovieList) {
        return <div>No Data</div>;
    } */

    return (
        <div className="movie-list">
            {category === 'movie' &&
                ((listType === 'popular' &&
                    dataPopularMovieList?.case({
                        pending: () => (
                            <div className="loader">
                                <span className="loader__text">Загрузка...</span>
                            </div>
                        ),
                        rejected: () => <div>Error</div>,
                        fulfilled: (list) => (
                            <>
                                <Swiper
                                    // modules={[Autoplay]}
                                    grabCursor={true}
                                    spaceBetween={10}
                                    slidesPerView={'auto'}
                                    // autoplay={{ delay: 3000 }}
                                >
                                    {list.results.map((item, i) => (
                                        <SwiperSlide key={i}>
                                            <MovieCard movieItem={item} category={category} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </>
                        ),
                    })) ||
                    (listType === 'top_rated' &&
                        dataTopMovieList?.case({
                            pending: () => (
                                <div className="loader">
                                    <span className="loader__text">Загрузка...</span>
                                </div>
                            ),
                            rejected: () => <div>Error</div>,
                            fulfilled: (list) => (
                                <>
                                    <Swiper
                                        // modules={[Autoplay]}
                                        grabCursor={true}
                                        spaceBetween={10}
                                        slidesPerView={'auto'}
                                        // autoplay={{ delay: 3000 }}
                                    >
                                        {list.results.map((item, i) => (
                                            <SwiperSlide key={i}>
                                                <MovieCard movieItem={item} category={category} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </>
                            ),
                        })))}
            {category === 'tv' &&
                ((listType === 'top_rated' &&
                    dataTopTVList?.case({
                        pending: () => (
                            <div className="loader">
                                <span className="loader__text">Загрузка...</span>
                            </div>
                        ),
                        rejected: () => <div>Error</div>,
                        fulfilled: (list) => (
                            <>
                                <Swiper
                                    // modules={[Autoplay]}
                                    grabCursor={true}
                                    spaceBetween={10}
                                    slidesPerView={'auto'}
                                    // autoplay={{ delay: 3000 }}
                                >
                                    {list.results.map((item, i) => (
                                        <SwiperSlide key={i}>
                                            <MovieCard tvItem={item} category={category} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </>
                        ),
                    })) ||
                    (listType === 'popular' &&
                        dataPopularTVList?.case({
                            pending: () => (
                                <div className="loader">
                                    <span className="loader__text">Загрузка...</span>
                                </div>
                            ),
                            rejected: () => <div>Error</div>,
                            fulfilled: (list) => (
                                <>
                                    <Swiper
                                        // modules={[Autoplay]}
                                        grabCursor={true}
                                        spaceBetween={10}
                                        slidesPerView={'auto'}
                                        // autoplay={{ delay: 3000 }}
                                    >
                                        {list.results.map((item, i) => (
                                            <SwiperSlide key={i}>
                                                <MovieCard tvItem={item} category={category} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </>
                            ),
                        })))}
        </div>
    );
};

export default observer(MovieList);
