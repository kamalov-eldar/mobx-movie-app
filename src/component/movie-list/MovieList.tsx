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
    id?: number;
};

const MovieList: FC<MovieListProps> = ({ category, listType, id }) => {
    const { moviesStore, tvStore } = useStores();
    const { dataPopularMovieList, dataTopMovieList, dataSimilarMovieList, getMovieList } = moviesStore;
    const { dataTopTVList, dataPopularTVList, getTVList } = tvStore;

    useEffect(() => {
        const params = { page: 1 };

        switch (category) {
            case 'movie':
                getMovieList(listType, { params }, id);
                break;
            case 'tv':
                getTVList(listType, { params });
                break;
        }
    }, [category, listType, id]);

    return (
        <div className="movie-list">
            {category === 'movie' &&
                ((listType === 'popular' &&
                    dataPopularMovieList?.case({
                        pending: () => (
                            <div>
                                <span className="loader__text">Загрузка...</span>
                            </div>
                        ),
                        rejected: () => (
                            <div>
                                <span className="loader__text">Error</span>
                            </div>
                        ),
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
                                <div>
                                    <span className="loader__text">Загрузка...</span>
                                </div>
                            ),
                            rejected: () => (
                                <div>
                                    <span className="loader__text">Error</span>
                                </div>
                            ),

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
                    (listType === 'similar' &&
                        dataSimilarMovieList?.case({
                            pending: () => (
                                <div>
                                    <span className="loader__text">Загрузка...</span>
                                </div>
                            ),
                            rejected: () => (
                                <div>
                                    <span className="loader__text">Error</span>
                                </div>
                            ),
                            fulfilled: (list) => (
                                <>
                                    {list.results.length > 0 ? (
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
                                    ) : (
                                        <div>no matches </div>
                                    )}
                                </>
                            ),
                        })))}
            {category === 'tv' &&
                ((listType === 'top_rated' &&
                    dataTopTVList?.case({
                        pending: () => (
                            <div>
                                <span className="loader__text">Загрузка...</span>
                            </div>
                        ),
                        rejected: () => (
                            <div>
                                <span className="loader__text">Error</span>
                            </div>
                        ),
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
                                <div>
                                    <span className="loader__text">Загрузка...</span>
                                </div>
                            ),
                            rejected: () => (
                                <div>
                                    <span className="loader__text">Error</span>
                                </div>
                            ),
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
