import React, { FC, useEffect, useState } from 'react';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import HeroSlideItem from './Hero-slide-Item/HeroSlideItem';

import './Hero-slide.scss';
import TrailerModal from './Hero-slide-Item/TrailerModal';
import { TMovieItem } from '../../api/types';
import { useStores } from '../../root-store-context';
import { observer } from 'mobx-react-lite';

const HeroSlide: FC = () => {
    const { moviesStore } = useStores();
    const { dataPopularMovieList } = moviesStore;

    SwiperCore.use([Autoplay]);

    if (!dataPopularMovieList) {
        return <div>No Data HeroSlide</div>;
    }

    return (
        <div className="hero-slide">
            {dataPopularMovieList?.case({
                pending: () => (
                    <div className="loader">
                        <span className="loader__text">Загрузка...</span>
                    </div>
                ),
                rejected: () => <div>Error</div>,
                fulfilled: (movieList) => (
                    <>
                        <Swiper
                            // modules={[Autoplay]}
                            grabCursor={true}
                            spaceBetween={0}
                            slidesPerView={1}
                            // autoplay={{ delay: 3000 }}
                        >
                            {movieList.results.map((item, i) => (
                                <SwiperSlide key={i}>
                                    {({ isActive }) => <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />}
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {movieList.results.map((item, i) => (
                            <TrailerModal key={i} item={item} />
                        ))}
                    </>
                ),
            })}
        </div>
    );
};

export default observer(HeroSlide);
